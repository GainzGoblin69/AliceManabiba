package com.gainzgoblin.alicemanabiba

import android.content.Context
import android.media.AudioAttributes
import android.media.SoundPool
import android.util.Log
import android.webkit.JavascriptInterface

/**
 * The game's sound effects: short audio files in assets/game/sfx, loaded once into memory and played by
 * Android's SoundPool. Unlike sounds synthesized inside the web page, these can't stutter when the screen is busy.
 */
class Sfx(context: Context) {
    private val pool =
        SoundPool.Builder()
            .setMaxStreams(6)
            .setAudioAttributes(
                AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_GAME).setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION).build(),
            )
            .build()
    private val ids = HashMap<String, Int>()
    private val ready = HashSet<Int>()

    init {
        pool.setOnLoadCompleteListener { _, id, status -> if (status == 0) synchronized(ready) { ready += id } }
        val names = context.assets.list("game/sfx").orEmpty().filter { it.endsWith(".ogg") && it != "waltz.ogg" }
        for (file in names) {
            runCatching {
                context.assets.openFd("game/sfx/$file").use { ids[file.removeSuffix(".ogg")] = pool.load(it, 1) }
            }.onFailure { Log.w("Sfx", "Couldn't load $file", it) }
        }
    }

    @JavascriptInterface
    fun play(name: String) {
        val id = ids[name] ?: return
        if (synchronized(ready) { id in ready }) {
            val volume = if (name.startsWith("move")) 0.55f else 0.9f
            pool.play(id, volume, volume, 1, 0, 1f)
        }
    }

    fun release() = pool.release()
}
