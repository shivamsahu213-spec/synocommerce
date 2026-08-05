# Offline Queue & Automatic Background Sync

## Overview

SynoCommerce Mobile App allows customers to add items to cart, browse cached product listings, and place orders in offline mode.

---

## Sync Mechanism

- **Encrypted Local Database**: SQLite / Realm persistence.
- **Background Sync Service**: Automatic flush upon network reconnection with conflict resolution.
