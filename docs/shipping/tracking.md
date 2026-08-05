# Live Shipment Tracking & Predictive ETA Architecture

## Overview

SynoCommerce provides real-time shipment status tracking across all 8 carriers with predictive ETA calculation and milestone timeline rendering.

---

## Tracking Timeline Model

- **MANIFESTED**: Shipping label printed & carrier notified.
- **PICKUP_SCHEDULED**: Driver assigned for warehouse dispatch.
- **IN_TRANSIT**: Package moving through sorting facilities.
- **OUT_FOR_DELIVERY**: Package loaded on last-mile delivery vehicle.
- **DELIVERED**: Final proof of delivery received.
