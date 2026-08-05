# Production Payment Webhook Architecture & Security

## Overview

SynoCommerce webhook processors handle asynchronous state updates from Razorpay and Stripe with constant-time HMAC signature verification, 300-second timestamp freshness checks, and duplicate delivery deduplication.

---

## 1. Supported Events

### Razorpay Events
- `payment.authorized`
- `payment.captured`
- `payment.failed`
- `refund.created`
- `refund.processed`

### Stripe Events
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`
- `checkout.session.completed`

---

## 2. Security Safeguards

1. **Constant-Time Comparison**: Signatures are compared using `crypto.timingSafeEqual` to eliminate timing side-channel attacks.
2. **Replay Attack Defense**: Webhook timestamps older than 300 seconds are rejected.
3. **Idempotency Deduplication**: In-memory and Redis deduplication prevent duplicate order processing.
