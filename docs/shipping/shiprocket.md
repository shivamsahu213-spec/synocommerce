# Shiprocket Shipping Integration

## Overview

SynoCommerce integrates with Shiprocket for Indian automated logistics, AWB generation, and multi-courier dispatch (Delhivery, BlueDart, Shadowfax, Xpressbees).

---

## Configuration

Set environment variables in `.env.production`:

```env
SHIPROCKET_EMAIL=prod_shiprocket@synocommerce.com
SHIPROCKET_PASSWORD=prod_shiprocket_pass
SHIPROCKET_WEBHOOK_SECRET=sr_prod_secret
```

---

## API Usage

```typescript
import { ShippingCarrierProvider } from '@/integrations/shipping';

const shipping = new ShippingCarrierProvider();

const res = await shipping.createShipment({
  orderId: 'ORD-9912',
  carrier: 'SHIPROCKET',
  totalWeightKg: 1.5,
  paymentMode: 'COD',
  // addresses...
});
```
