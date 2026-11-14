package com.gainzgoblin.alicemanabiba

import android.content.Context
import android.media.AudioAttributes
import android.media.MediaPlayer
import android.net.Uri
import android.os.Handler
import android.os.Looper
import android.util.Base64
import android.util.Log
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.net.HttpURLConnection
import java.net.URL
import java.net.URLDecoder

/**
 * Background music from a folder on your server (Copyparty on Whatbox, read-only, password protected), the
 * same way RomM TV does it: every song in the folder and its sub-folders, shuffled, played quietly, with no
 * song names shown. It fades out when the app leaves the screen and dips while the game is talking.
 *
 * [onPlaying] tells the game whether songs are playing, so its own music-box waltz can rest meanwhile and
 * take over if there's no folder set or the server can't be reached.
 */
object BackgroundMusic {
    data class Settings(val url: String, val password: String, val enabled: Boolean)

    /** Alice Game folder on Whatbox (~/files/Alice Game), shared by Copyparty as /alice/; suggested the first time. */
    const val SUGGESTED = "https://music.alice99.box.ca/alice/"
    private const val PREFS = "music"
    private const val TAG = "BackgroundMusic"
    private val AUDIO = setOf("mp3", "ogg", "oga", "opus", "m4a", "aac", "flac", "wav")
    private const val MAX_DEPTH = 3
    private const val VOLUME = 0.30f
    private const val DUCKED = 0.08f

    private val main = Handler(Looper.getMainLooper())
    private lateinit var app: Context
    var onPlaying: ((Boolean) -> Unit)? = null

    private var player: MediaPlayer? = null
    private var tracks: List<String> = emptyList()
    private var queue = ArrayDeque<String>()
    private var lastTrack: String? = null
    private var foreground = false
    private var ducked = false
    private var loading = false
    private var failures = 0
    private var volume = 0f
    private var fade: Runnable? = null
    private var generation = 0 // bumps whenever settings change, so stale work is dropped

    // ---------- settings ----------

    private fun prefs() = app.getSharedPreferences(PREFS, Context.MODE_PRIVATE)

    fun init(context: Context) {
        if (!::app.isInitialized) app = context.applicationContext
    }

    fun settings(): Settings {
        val p = prefs()
        return Settings(p.getString("url", "") ?: "", p.getString("password", "") ?: "", p.getBoolean("enabled", true))
    }

    fun normalize(url: String): String {
        var u = url.trim()
        if (u.isEmpty()) return ""
        if (!u.startsWith("http://") && !u.startsWith("https://")) u = "https://$u"
        if (!u.endsWith("/")) u += "/"
        return u
    }

    /** Saves a new folder (after it was checked) and starts playing from it. */
    fun saveFolder(url: String, password: String, found: List<String>) {
        prefs().edit().putString("url", normalize(url)).putString("password", password).commit()
        writeCache(normalize(url), found)
        restart(found)
    }

    /** The game's Music on/off switch. */
    fun setEnabled(on: Boolean) {
        main.post {
            prefs().edit().putBoolean("enabled", on).apply()
            if (on) resume() else if (player != null) fadeTo(0f, 700) { stopPlayer() }
        }
    }

    /** Quieter while the game speaks a word or a letter. */
    fun duck(on: Boolean) {
        main.post {
            ducked = on
            if (player?.isPlaying == true) fadeTo(target(), if (on) 250 else 900)
        }
    }

    fun isPlaying() = player?.isPlaying == true

    private fun target() = if (ducked) DUCKED else VOLUME

    // ---------- lifecycle (called from the activity) ----------

    fun onForeground() {
        foreground = true
        resume()
    }

    fun onBackground() {
        foreground = false
        fadeTo(0f, 600) { runCatching { player?.pause() } }
    }

    private fun resume() {
        val s = settings()
        if (!foreground || !s.enabled || s.url.isBlank()) {
            if (s.url.isBlank()) tell(false)
            return
        }
        val p = player
        if (p != null) {
            runCatching { if (!p.isPlaying) p.start() }
            tell(true)
            fadeTo(target(), 1500)
            return
        }
        if (tracks.isNotEmpty()) {
            playNext()
            return
        }
        if (loading) return
        loading = true
        val gen = generation
        Thread {
            // the song list is kept on the TV so music starts at once; the folder is re-read for new songs
            val cached = readCache(s.url)
            val list = cached.ifEmpty { runCatching { scan(s.url, s.password) }.onFailure { Log.w(TAG, "Couldn't list the music folder", it) }.getOrDefault(emptyList()) }
            if (cached.isEmpty() && list.isNotEmpty()) writeCache(s.url, list)
            main.post {
                if (gen != generation) return@post
                loading = false
                tracks = list
                if (list.isEmpty()) tell(false) else playNext()
            }
            if (cached.isNotEmpty()) {
                val fresh = runCatching { scan(s.url, s.password) }.getOrNull()
                if (!fresh.isNullOrEmpty()) {
                    writeCache(s.url, fresh)
                    main.post { if (gen == generation) tracks = fresh }
                }
            }
        }.start()
    }

    private fun restart(list: List<String>) {
        main.post {
            generation++
            stopPlayer()
            loading = false
            queue.clear()
            tracks = list
            failures = 0
            if (foreground) resume()
        }
    }

    private fun tell(playing: Boolean) {
        main.post { onPlaying?.invoke(playing) }
    }

    // ---------- playing ----------

    private fun nextTrack(): String? {
        if (tracks.isEmpty()) return null
        if (queue.isEmpty()) {
            // every song once before any repeats, and never the same song twice in a row
            val shuffled = tracks.shuffled()
            queue = ArrayDeque(if (shuffled.size > 1 && shuffled.first() == lastTrack) shuffled.drop(1) + shuffled.first() else shuffled)
        }
        return queue.removeFirstOrNull()
    }

    private fun playNext() {
        val s = settings()
        if (!foreground || !s.enabled) return
        val track = nextTrack() ?: return
        stopPlayer(quiet = true) // between songs the game's waltz stays resting
        val mp = MediaPlayer()
        player = mp
        lastTrack = track
        runCatching {
            mp.setAudioAttributes(
                AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_GAME).setContentType(AudioAttributes.CONTENT_TYPE_MUSIC).build(),
            )
            mp.setDataSource(app, Uri.parse(track), authHeaders(s.password))
            mp.setVolume(0f, 0f)
            mp.setOnPreparedListener {
                if (player !== mp) return@setOnPreparedListener
                failures = 0
                if (foreground) {
                    mp.start()
                    tell(true)
                    fadeTo(target(), 2000)
                }
            }
            mp.setOnCompletionListener { if (player === mp) playNext() }
            mp.setOnErrorListener { _, what, extra ->
                Log.w(TAG, "Couldn't play $track ($what/$extra)")
                if (player === mp) failed()
                true
            }
            mp.prepareAsync()
        }.onFailure {
            Log.w(TAG, "Couldn't start $track", it)
            failed()
        }
    }

    private fun failed() {
        failures++
        if (failures < 5) {
            main.postDelayed({ playNext() }, 500)
        } else {
            stopPlayer()
            tell(false) // the game's waltz takes over
        }
    }

    private fun stopPlayer(quiet: Boolean = false) {
        fade?.let { main.removeCallbacks(it) }
        player?.let { runCatching { it.release() } }
        player = null
        volume = 0f
        if (!quiet) tell(false)
    }

    private fun fadeTo(to: Float, millis: Long, then: () -> Unit = {}) {
        fade?.let { main.removeCallbacks(it) }
        val from = volume
        val steps = 20
        var i = 0
        val r =
            object : Runnable {
                override fun run() {
                    i++
                    volume = from + (to - from) * i / steps
                    runCatching { player?.setVolume(volume, volume) }
                    if (i < steps) main.postDelayed(this, millis / steps) else then()
                }
            }
        fade = r
        main.post(r)
    }

    // ---------- the folder ----------

    private fun authHeaders(password: String): Map<String, String> =
        if (password.isBlank()) {
            emptyMap()
        } else {
            mapOf(
                "PW" to password,
                "Authorization" to "Basic " + Base64.encodeToString("alice:$password".toByteArray(), Base64.NO_WRAP),
            )
        }

    /** Lists every song in the folder (blocking). Throws with a readable message if it can't be read. */
    fun scan(url: String, password: String): List<String> {
        val out = mutableListOf<String>()
        walk(normalize(url), password, 0, out)
        return out
    }

    private fun walk(dirUrl: String, password: String, depth: Int, out: MutableList<String>) {
        val json = JSONObject(get("$dirUrl?ls", password))
        val files = json.optJSONArray("files") ?: JSONArray()
        for (i in 0 until files.length()) {
            val f = files.getJSONObject(i)
            if (nameOf(f).substringAfterLast('.').lowercase() in AUDIO) out += dirUrl + f.optString("href")
        }
        if (depth >= MAX_DEPTH) return
        val dirs = json.optJSONArray("dirs") ?: JSONArray()
        for (i in 0 until dirs.length()) {
            val d = dirs.getJSONObject(i)
            if (nameOf(d).startsWith(".")) continue
            val href = d.optString("href").let { if (it.endsWith("/")) it else "$it/" }
            runCatching { walk(dirUrl + href, password, depth + 1, out) }.onFailure { Log.w(TAG, "Skipped a folder", it) }
        }
    }

    /** Copyparty's listing has only the link ("01%20-%20Song.mp3", folders end in "/"), so the name comes from it. */
    private fun nameOf(entry: JSONObject): String =
        entry.optString("name").ifBlank {
            val href = entry.optString("href").substringBefore('?').trimEnd('/')
            URLDecoder.decode(href.substringAfterLast('/').replace("+", "%2B"), "UTF-8")
        }

    private fun get(url: String, password: String): String {
        val c = URL(url).openConnection() as HttpURLConnection
        try {
            c.connectTimeout = 15_000
            c.readTimeout = 30_000
            authHeaders(password).forEach { (k, v) -> c.setRequestProperty(k, v) }
            val code = c.responseCode
            if (code == 401 || code == 403) error("the password was refused")
            if (code == 404) error("that folder wasn't found")
            if (code >= 400) error("the server answered HTTP $code")
            return c.inputStream.use { it.reader().readText() }
        } finally {
            c.disconnect()
        }
    }

    private fun cacheFile() = File(app.filesDir, "music-tracks.json")

    private fun readCache(url: String): List<String> =
        runCatching {
            val o = JSONObject(cacheFile().readText())
            if (o.optString("folder") != normalize(url)) return emptyList()
            val a = o.getJSONArray("tracks")
            (0 until a.length()).map { a.getString(it) }
        }.getOrDefault(emptyList())

    private fun writeCache(url: String, list: List<String>) {
        runCatching {
            cacheFile().writeText(JSONObject().put("folder", normalize(url)).put("tracks", JSONArray(list)).toString())
        }
    }
}
