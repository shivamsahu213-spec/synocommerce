# Resend Email Integration

## Overview

SynoCommerce integrates with Resend for high-deliverability transactional emails.

---

## Configuration

Set environment variables in `.env.production`:

```env
RESEND_API_KEY=re_live_your_api_key
```

---

## API Usage

```typescript
import { EmailProviderService } from '@/integrations/notifications';

const email = new EmailProviderService();
const res = await email.sendEmail({
  to: 'customer@example.com',
  subject: 'Order Receipt',
  htmlBody: '<h1>Thank you for your order!</h1>',
  providerPreference: 'RESEND',
});
```
