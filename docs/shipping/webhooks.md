# Carrier Webhook Security & NDR/RTO Architecture

## Overview

SynoCommerce processes carrier delivery status webhooks (`DELIVERY_CONFIRMED`, `DELIVERY_FAILED`, `NDR_RAISED`, `RTO_INITIATED`) with HMAC SHA-256 validation, 300-second timestamp freshness, and deduplication.

---

## Security Safeguards

- **Constant-Time Signature Comparison**: `crypto.timingSafeEqual` prevents timing attacks.
- **Replay Attack Defense**: Rejects webhooks with timestamps older than 300 seconds.
- **NDR & RTO Processing**: Triggers automated customer SMS/Email re-attempt prompts upon delivery failure.
