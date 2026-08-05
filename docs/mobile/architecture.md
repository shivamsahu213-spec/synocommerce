# Enterprise Mobile SDK Architecture

## Executive Overview

The **SynoCommerce Mobile SDK Platform** (`sdk/mobile/`) provides cross-platform SDKs for Android (Kotlin), iOS (Swift), Flutter (Dart), and React Native/Expo.

```
                    +--------------------------------------------------+
                    |           SYNCOMMERCE MOBILE SDK CORE            |
                    |    (Auth, Cart, Catalog, Checkout, Analytics)    |
                    +--------------------------------------------------+
                                             |
         +-------------------+---------------+---------------+-------------------+
         |                   |                               |                   |
         v                   v                               v                   v
+-----------------+ +-----------------+             +-----------------+ +-----------------+
| ANDROID KOTLIN  | | iOS SWIFT SDK   |             | FLUTTER DART    | | REACT NATIVE    |
| (Keystore &     | | (Keychain &     |             | (MethodChannel  | | (Expo Secure   |
|  SQLite Sync)   | |  SecureEnclave) |             |  Plugin)        | |  Store Bridge)  |
+-----------------+ +-----------------+             +-----------------+ +-----------------+
```
