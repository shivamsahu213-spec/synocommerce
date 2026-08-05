# Enterprise Desktop POS Architecture

## Executive Overview

The **SynoCommerce Desktop POS Platform** (`apps/desktop-pos/`) delivers an enterprise-grade retail point-of-sale terminal built for **Windows**, **macOS**, **Linux**, and **Electron**.

```
                    +--------------------------------------------------+
                    |             ELECTRON DESKTOP SHELL               |
                    |        (Windows, macOS, Linux Cross-Platform)    |
                    +--------------------------------------------------+
                                             |
         +-----------------------------------+-----------------------------------+
         |                                   |                                   |
         v                                   v                                   v
+-----------------+                 +-----------------+                 +-----------------+
| HARDWARE ENGINE |                 | REGISTER ENGINE |                 | OFFLINE SYNC    |
| (Printers,      |                 | (X/Z Reports,   |                 | (Local SQLite   |
|  Scanners,      |                 |  Split Payments,|                 |  Queue & Server |
|  Cash Drawers)  |                 |  Manager PIN)   |                 |  Sync Engine)   |
+-----------------+                 +-----------------+                 +-----------------+
```
