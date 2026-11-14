plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

// GitHub Actions passes its run number, so every build has a higher version than the last (in-app updates)
val buildNumber = (findProperty("buildNumber") as String?)?.toIntOrNull() ?: 1

android {
    namespace = "com.gainzgoblin.alicemanabiba"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.gainzgoblin.alicemanabiba"
        minSdk = 24
        targetSdk = 35
        versionCode = buildNumber
        versionName = "1.$buildNumber"
        buildConfigField("String", "UPDATE_REPO", "\"GainzGoblin69/AliceManabiba\"")
    }

    signingConfigs {
        // one key kept in the repo, so every build installs over the previous one
        create("shared") {
            storeFile = file("$rootDir/debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName("shared")
        }
        debug { signingConfig = signingConfigs.getByName("shared") }
    }

    buildFeatures { buildConfig = true }
    lint { checkReleaseBuilds = false }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }
}
