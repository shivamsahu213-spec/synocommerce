# Multi-Carrier Shipping & Fulfillment Architecture

## Executive Overview

The **SynoCommerce Shipping & Omnichannel Fulfillment Platform** (`src/integrations/shipping/`) integrates 8 major shipping carriers (Shiprocket, Delhivery, FedEx, UPS, DHL, BlueDart, DTDC, India Post), multi-warehouse routing, omnichannel fulfillment (Ship From Store, BOPIS, Curbside, Click & Collect), and live tracking.

```
                    +--------------------------------------------------+
                    |          MULTI-CARRIER SHIPPING PROVIDER         |
                    |   (Shiprocket, Delhivery, FedEx, UPS, DHL, etc)  |
                    +--------------------------------------------------+
                                             |
             +-------------------------------+-------------------------------+
             |                               |                               |
             v                               v                               v
    +-----------------+             +-----------------+             +-----------------+
    | WAREHOUSE ROUTER|             | FULFILLMENT     |             | LIVE TRACKING   |
    | (Nearest Hub &  |             | (BOPIS, Curbside|             | (Timeline & ETA |
    |  Capacity SLA)  |             |  Ship-from-store|             |  Notifications) |
    +-----------------+             +-----------------+             +-----------------+
```
