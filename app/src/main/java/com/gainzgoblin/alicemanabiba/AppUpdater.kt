package com.gainzgoblin.alicemanabiba

import android.app.Activity
import android.app.AlertDialog
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.pm.PackageInstaller
import android.net.Uri
import android.os.Build
import android.provider.Settings
import android.util.Log
import android.widget.Toast
import org.json.JSONObject
import java.io.File
import java.net.HttpURLConnection
import java.net.URL

/**
 * In-app updates from GitHub, the same way as RomM TV: every push builds a new APK and publishes it as the
 * "latest" release with a version.txt holding its build number. A higher number than ours gets offered.
 */
object AppUpdater {
    private const val APK_NAME = "AliceManabiba.apk"
    private const val TAG = "AppUpdater"

    private data class Release(val build: Int, val apkUrl: String)

    fun checkInBackground(activity: Activity) {
        Thread {
            val release = runCatching { latestRelease() }.onFailure { Log.w(TAG, "Update check failed", it) }.getOrNull()
                ?: return@Thread
            if (release.build <= BuildConfig.VERSION_CODE) return@Thread
            activity.runOnUiThread {
                if (activity.isFinishing) return@runOnUiThread
                AlertDialog.Builder(activity)
                    .setTitle("A new Alice Manabiba is ready")
                    .setMessage("Build ${release.build} is available. You have build ${BuildConfig.VERSION_CODE}.")
                    .setPositiveButton("Update now") { _, _ -> install(activity, release) }
                    .setNegativeButton("Later", null)
                    .show()
            }
        }.start()
    }

    private fun open(url: String): HttpURLConnection =
        (URL(url).openConnection() as HttpURLConnection).apply {
            connectTimeout = 15_000
            readTimeout = 30_000
            instanceFollowRedirects = true
            setRequestProperty("User-Agent", "AliceManabiba/${BuildConfig.VERSION_CODE}")
            setRequestProperty("Accept", "application/vnd.github+json")
        }

    private fun latestRelease(): Release? {
        val conn = open("https://api.github.com/repos/${BuildConfig.UPDATE_REPO}/releases/tags/latest")
        if (conn.responseCode != 200) return null
        val json = JSONObject(conn.inputStream.bufferedReader().use { it.readText() })
        val assets = json.getJSONArray("assets")
        var versionUrl: String? = null
        var apkUrl: String? = null
        for (i in 0 until assets.length()) {
            val a = assets.getJSONObject(i)
            when (a.getString("name")) {
                "version.txt" -> versionUrl = a.getString("browser_download_url")
                APK_NAME -> apkUrl = a.getString("browser_download_url")
            }
        }
        if (versionUrl == null || apkUrl == null) return null
        val build = open(versionUrl).inputStream.bufferedReader().use { it.readText() }.trim().toIntOrNull() ?: return null
        return Release(build, apkUrl)
    }

    private fun install(activity: Activity, release: Release) {
        // Android asks once for permission to install updates from this app
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && !activity.packageManager.canRequestPackageInstalls()) {
            Toast.makeText(activity, "Allow Alice Manabiba to install updates, then go back and choose Update again.", Toast.LENGTH_LONG).show()
            runCatching {
                activity.startActivity(Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:${activity.packageName}")))
            }
            return
        }
        val progress = AlertDialog.Builder(activity)
            .setTitle("Downloading build ${release.build}")
            .setMessage("Starting…")
            .setCancelable(false)
            .show()

        Thread {
            val apk = File(activity.cacheDir, APK_NAME)
            val ok = runCatching {
                val conn = open(release.apkUrl)
                conn.setRequestProperty("Accept", "application/octet-stream")
                if (conn.responseCode !in 200..299) error("Download failed (${conn.responseCode})")
                val total = conn.contentLengthLong
                conn.inputStream.use { input ->
                    apk.outputStream().use { output ->
                        val buffer = ByteArray(128 * 1024)
                        var done = 0L
                        var shown = 0L
                        while (true) {
                            val n = input.read(buffer)
                            if (n < 0) break
                            output.write(buffer, 0, n)
                            done += n
                            if (done - shown > 300_000) {
                                shown = done
                                val text = if (total > 0) "${done * 100 / total}%" else "${done / 1000} KB"
                                activity.runOnUiThread { progress.setMessage(text) }
                            }
                        }
                    }
                }
                commit(activity, apk)
            }.onFailure { Log.e(TAG, "Update failed", it) }.isSuccess
            activity.runOnUiThread {
                progress.dismiss()
                if (!ok) Toast.makeText(activity, "The update couldn't be downloaded. Try again later.", Toast.LENGTH_LONG).show()
            }
        }.start()
    }

    private fun commit(context: Context, apk: File) {
        val installer = context.packageManager.packageInstaller
        val params = PackageInstaller.SessionParams(PackageInstaller.SessionParams.MODE_FULL_INSTALL)
        params.setAppPackageName(context.packageName)
        val sessionId = installer.createSession(params)
        installer.openSession(sessionId).use { session ->
            session.openWrite("update", 0, apk.length()).use { out ->
                apk.inputStream().use { it.copyTo(out) }
                session.fsync(out)
            }
            val intent = Intent(context, InstallResultReceiver::class.java)
            val flags = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_MUTABLE
            } else {
                PendingIntent.FLAG_UPDATE_CURRENT
            }
            session.commit(PendingIntent.getBroadcast(context, sessionId, intent, flags).intentSender)
        }
    }

    /** Android hands back its "update this app?" screen here; we show it. */
    class InstallResultReceiver : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            when (intent.getIntExtra(PackageInstaller.EXTRA_STATUS, PackageInstaller.STATUS_FAILURE)) {
                PackageInstaller.STATUS_PENDING_USER_ACTION -> {
                    @Suppress("DEPRECATION")
                    val confirm = intent.getParcelableExtra<Intent>(Intent.EXTRA_INTENT) ?: return
                    confirm.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    context.startActivity(confirm)
                }
                PackageInstaller.STATUS_SUCCESS -> Unit
                else -> {
                    val message = intent.getStringExtra(PackageInstaller.EXTRA_STATUS_MESSAGE)
                    Toast.makeText(context, "The update didn't install: $message", Toast.LENGTH_LONG).show()
                }
            }
        }
    }
}
