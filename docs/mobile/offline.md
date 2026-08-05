# Mobile Offline Sync & Storage Engine

## Overview

SynoCommerce Mobile SDK allows users to browse products, add items to cart, and place orders even when offline.

---

## Technical Architecture

1. **Offline Queue**: Operations performed offline are stored in an encrypted local queue.
2. **Auto Sync**: When network connectivity is restored, the queue automatically syncs with SynoCommerce backend.
3. **Conflict Resolution**: Server-side timestamp resolution handles concurrent stock reservation.
