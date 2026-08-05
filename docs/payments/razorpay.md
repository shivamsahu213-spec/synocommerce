# Production Razorpay Payment Integration

## Overview

SynoCommerce integrates with Razorpay to provide Indian UPI, Netbanking, Cards, and Wallet payments.

---

## 1. Setup & Configuration

Set environment variables in `.env.production`:

```env
RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=rzp_live_your_key_secret
RAZORPAY_WEBHOOK_SECRET=rzp_live_your_webhook_secret
```

---

## 2. API Usage Example

```typescript
import { RazorpayProvider } from '@/integrations/payments';

const razorpay = new RazorpayProvider();

// 1. Create Order
const order = await razorpay.createOrder({
  amountInPaisa: 249900, // ₹2,499.00
  currency: 'INR',
  receipt: 'rcpt_order_1001',
});

// 2. Verify Signature
const isValid = razorpay.verifyPaymentSignature({
  razorpayOrderId: order.id,
  razorpayPaymentId: 'pay_99182',
  razorpaySignature: 'received_signature',
});
```
