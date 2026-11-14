package com.gainzgoblin.alicemanabiba

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import android.view.InputDevice
import android.view.KeyEvent
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import java.util.Locale

/**
 * The game is a web page bundled in assets/game. This activity shows it full screen and adds what a
 * web page can't do well on a TV: the Android voice for hints, remote and controller buttons, and saving.
 */
class MainActivity : Activity() {
    private lateinit var web: WebView
    private var tts: TextToSpeech? = null
    private var ttsReady = false
    private val main = Handler(Looper.getMainLooper())

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)

        web = WebView(this)
        web.setBackgroundColor(0xFF5B3D8C.toInt())
        web.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            mediaPlaybackRequiresUserGesture = false
            allowFileAccess = true
            useWideViewPort = true
            loadWithOverviewMode = true
            textZoom = 100 // ignore the TV's accessibility font size; the game scales itself
            setSupportZoom(false)
        }
        web.setInitialScale(0)
        web.webViewClient =
            object : WebViewClient() {
                override fun onPageFinished(view: WebView, url: String) = refit()
            }
        web.addOnLayoutChangeListener { _, _, _, _, _, _, _, _, _ -> refit() }
        web.webChromeClient = WebChromeClient()
        web.addJavascriptInterface(TtsBridge(), "AndroidTTS")
        web.addJavascriptInterface(StoreBridge(), "AndroidStore")
        web.isFocusable = false // keys come through dispatchKeyEvent below
        setContentView(web)
        hideSystemBars()

        tts = TextToSpeech(this) { status ->
            if (status == TextToSpeech.SUCCESS) {
                tts?.language = Locale.US
                tts?.setPitch(1.1f)
                tts?.setOnUtteranceProgressListener(
                    object : UtteranceProgressListener() {
                        override fun onStart(id: String) = Unit
                        override fun onDone(id: String) = done(id)
                        @Deprecated("Deprecated in Java")
                        override fun onError(id: String) = done(id)
                        override fun onStop(id: String, interrupted: Boolean) = done(id)
                    },
                )
                ttsReady = true
            }
        }

        web.loadUrl("file:///android_asset/game/index.html")
        AppUpdater.checkInBackground(this)
    }

    /** Ask the game to re-measure the screen (after loading and whenever the view changes size). */
    private fun refit() {
        main.post { web.evaluateJavascript("window.fit && window.fit()", null) }
    }

    private fun done(id: String) {
        val safe = id.filter { it.isLetterOrDigit() }
        main.post { web.evaluateJavascript("window.__ttsDone && window.__ttsDone('$safe')", null) }
    }

    private fun send(key: String, onResult: ((String) -> Unit)? = null) {
        web.evaluateJavascript("window.tvKey ? window.tvKey('$key') : false") { onResult?.invoke(it) }
    }

    // ---------- remote + controller buttons ----------

    private fun keyName(code: Int): String? =
        when (code) {
            KeyEvent.KEYCODE_DPAD_UP -> "up"
            KeyEvent.KEYCODE_DPAD_DOWN -> "down"
            KeyEvent.KEYCODE_DPAD_LEFT -> "left"
            KeyEvent.KEYCODE_DPAD_RIGHT -> "right"
            KeyEvent.KEYCODE_DPAD_CENTER, KeyEvent.KEYCODE_ENTER, KeyEvent.KEYCODE_NUMPAD_ENTER,
            KeyEvent.KEYCODE_BUTTON_A, KeyEvent.KEYCODE_SPACE, KeyEvent.KEYCODE_BUTTON_START,
            -> "ok"
            KeyEvent.KEYCODE_BACK, KeyEvent.KEYCODE_BUTTON_B, KeyEvent.KEYCODE_ESCAPE -> "back"
            KeyEvent.KEYCODE_BUTTON_X, KeyEvent.KEYCODE_1, KeyEvent.KEYCODE_PROG_RED -> "hint1"
            KeyEvent.KEYCODE_BUTTON_Y, KeyEvent.KEYCODE_2, KeyEvent.KEYCODE_PROG_GREEN -> "hint2"
            else -> null
        }

    override fun dispatchKeyEvent(event: KeyEvent): Boolean {
        val name = keyName(event.keyCode) ?: return super.dispatchKeyEvent(event)
        if (event.action != KeyEvent.ACTION_DOWN) return true
        val isMove = name in setOf("up", "down", "left", "right")
        if (event.repeatCount > 0 && !isMove) return true
        if (name == "back") {
            // the game says whether it used Back; on the title screen it doesn't, and the app closes
            send("back") { if (it == "false") finish() }
        } else {
            send(name)
        }
        return true
    }

    // analog sticks on controllers that don't send D-pad keys
    private var stickDir: String? = null
    private val stickRepeat = object : Runnable {
        override fun run() {
            stickDir?.let { send(it); main.postDelayed(this, 170) }
        }
    }

    override fun onGenericMotionEvent(event: MotionEvent): Boolean {
        if (event.source and InputDevice.SOURCE_JOYSTICK == InputDevice.SOURCE_JOYSTICK &&
            event.action == MotionEvent.ACTION_MOVE
        ) {
            val x = event.getAxisValue(MotionEvent.AXIS_X).let { if (kotlin.math.abs(it) > 0.5f) it else event.getAxisValue(MotionEvent.AXIS_HAT_X) }
            val y = event.getAxisValue(MotionEvent.AXIS_Y).let { if (kotlin.math.abs(it) > 0.5f) it else event.getAxisValue(MotionEvent.AXIS_HAT_Y) }
            val dir =
                when {
                    x < -0.5f -> "left"
                    x > 0.5f -> "right"
                    y < -0.5f -> "up"
                    y > 0.5f -> "down"
                    else -> null
                }
            if (dir != stickDir) {
                stickDir = dir
                main.removeCallbacks(stickRepeat)
                if (dir != null) {
                    send(dir)
                    main.postDelayed(stickRepeat, 400)
                }
            }
            return true
        }
        return super.onGenericMotionEvent(event)
    }

    // ---------- lifecycle ----------

    private fun hideSystemBars() {
        @Suppress("DEPRECATION")
        window.decorView.systemUiVisibility =
            View.SYSTEM_UI_FLAG_FULLSCREEN or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
    }

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        super.onWindowFocusChanged(hasFocus)
        if (hasFocus) hideSystemBars()
    }

    override fun onPause() {
        super.onPause()
        tts?.stop()
        web.onPause()
        web.pauseTimers() // music stops while the app is in the background
    }

    override fun onResume() {
        super.onResume()
        web.resumeTimers()
        web.onResume()
    }

    override fun onDestroy() {
        tts?.shutdown()
        web.destroy()
        super.onDestroy()
    }

    // ---------- bridges the game calls ----------

    inner class TtsBridge {
        @JavascriptInterface
        fun speak(text: String, rate: Float, id: String) {
            val engine = tts
            if (!ttsReady || engine == null) {
                done(id)
                return
            }
            engine.setSpeechRate(rate.coerceIn(0.3f, 2f))
            engine.speak(text, TextToSpeech.QUEUE_FLUSH, null, id)
        }

        @JavascriptInterface
        fun stop() {
            tts?.stop()
        }

        @JavascriptInterface
        fun isReady(): Boolean = ttsReady
    }

    inner class StoreBridge {
        private val prefs = getSharedPreferences("save", Context.MODE_PRIVATE)

        @JavascriptInterface
        fun get(): String? = prefs.getString("game", null)

        @JavascriptInterface
        fun set(json: String) {
            prefs.edit().putString("game", json).apply()
        }
    }
}
