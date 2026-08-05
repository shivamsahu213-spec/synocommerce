# Production Stripe Payment Integration

## Overview

SynoCommerce integrates with Stripe for international credit card, Apple Pay, Google Pay, and SEPA direct debit processing.

---

## 1. Setup & Configuration

Set environment variables in `.env.production`:

```env
STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key
STRIPE_SECRET_KEY=sk_live_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

---

## 2. API Usage Example

```typescript
import { StripeProvider } from '@/integrations/payments';

const stripe = new StripeProvider();

// 1. Create Customer
const customer = await stripe.createCustomer({
  email: 'customer@example.com',
  name: 'John Doe',
});

// 2. Create Payment Intent
const intent = await stripe.createPaymentIntent({
  amountInCents: 5000, // $50.00
  currency: 'USD',
  customerId: customer.id,
});
```
