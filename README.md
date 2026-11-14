# Alice Manabiba

A word and letter game for Android TV, set in Wonderland. A picture appears in the looking-glass, blank lines
show how many letters the word has, and the whole alphabet is scattered around as playing cards. Pick the
letters in order with the remote or a controller to spell the word, then walk Alice along the path to the next one.

## Controls

| | Remote | Controller | Keyboard / mouse |
|---|---|---|---|
| Move | D-pad | D-pad or left stick | Arrow keys / point |
| Pick a card | OK | A | Enter / click |
| Hint 1: hear the word | (focus "Hear it") | X | 1 |
| Hint 2: hear it spelled | (focus "Spell it") | Y | 2 |
| Back to map / title | Back | B | Esc |

A wrong card gives a soft buzz. Each word is worth 10 hearts, plus 5 for no wrong picks, and earns up to 3 stars.
Hints are free. There are 56 levels over 8 Wonderland stops, from three letters up to six.

**Find the picture** levels (🃏 on the map) turn it around: the word is spelled out and the cards show
pictures. Pick the one that matches. A wrong pick buzzes and says what that picture is.

Progress is saved by level name the moment a word is finished, so adding levels never loses it.

## Alice's Wardrobe

Hearts are spent in the Wardrobe (▼ from the map): 15 hair colors, 9 hairstyles, 10 outfits, 15 dress colors,
11 extras (tiara, bunny ears, top hat, crown…) and 6 skin tones (free). Focusing anything tries it on in the mirror;
OK buys it, or wears it if it's already hers. Her look shows on the title screen, the map and every celebration.
Items and prices are in `app/src/main/assets/game/wardrobe.js`.

## Background music

On the title screen, **⚙ Music folder** takes a Copyparty folder on your server and its password, the same
way RomM TV does. Every song in it (and folders inside it) plays in a shuffle, quietly, dipping while the game
talks. Without a folder, or if the server can't be reached, the built-in music-box waltz plays.

## How it's built

- `app/src/main/assets/game/index.html` is the whole game: art, music box waltz and sound effects are drawn
  and synthesized in code, so there are no image or audio files. It also runs in any browser for testing.
- `MainActivity.kt` shows it full screen and adds the Android voice (TextToSpeech) for hints, remote and
  controller buttons, and saving progress.
- **Updates:** every push to `main` builds a new APK and publishes it as the `latest` release
  (`.github/workflows/android.yml`). The app checks that release when it opens and offers the newer build.
  The APK is signed with the repo's `debug.keystore`, so every build installs over the last one.

Local build: `./gradlew :app:assembleRelease -PbuildNumber=1`

## Adding words

Edit `WORLDS` near the top of the script in `index.html`: each word is `["word","emoji"]`.

Alice's Adventures in Wonderland (1865) is in the public domain; the art here is original.
