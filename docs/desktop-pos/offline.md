# POS Offline Register Queue & Auto-Sync

## Overview

SynoCommerce Desktop POS supports 100% offline operation. Cashiers can continue processing checkouts, printing receipts, and opening cash drawers during network outages.

---

## Technical Flow

1. **Local Queue**: Transactions are serialized to local SQLite database with SHA256 integrity hashes.
2. **Background Sync**: When connection is restored, transactions sync to SynoCommerce backend without interrupting cashiers.
