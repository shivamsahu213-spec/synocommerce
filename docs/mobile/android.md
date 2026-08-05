# Android Mobile SDK (Kotlin / Java)

## Overview

SynoCommerce Android SDK provides native Kotlin and Java bindings for e-commerce integration, biometric authentication, and offline SQLite synchronization.

---

## Installation (Gradle)

```groovy
dependencies {
    implementation 'com.synocommerce.sdk:android:1.4.2'
}
```

---

## Usage Example (Kotlin)

```kotlin
val sdk = SynoAndroidSDK(
    config = MobileSdkConfig(
        apiKey = "syno_m_live_key",
        storeId = "store_01"
    )
)

val auth = sdk.loginGuest()
```
