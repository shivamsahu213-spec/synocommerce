# Enterprise Mobile Application Architecture

## Executive Overview

The **SynoCommerce Mobile Applications Platform** (`apps/mobile/`) delivers native mobile user experiences across Android, iPhone, iPad, Foldables, and Tablets using Flutter and React Native.

```
                    +--------------------------------------------------+
                    |             SYNOCOMMERCE MOBILE APP              |
                    |      (29 Core Screens & Navigation Matrix)       |
                    +--------------------------------------------------+
                                             |
             +-------------------------------+-------------------------------+
             |                               |                               |
             v                               v                               v
    +-----------------+             +-----------------+             +-----------------+
    | NATIVE FEATURES |             | OFFLINE ENGINE  |             | MOBILE SDK CORE |
    | (Apple/Google   |             | (SQLite Queue   |             | (Cart, Auth,    |
    |  Pay, Face ID)  |             |  & Auto-Sync)   |             |  Checkout API)  |
    +-----------------+             +-----------------+             +-----------------+
```
