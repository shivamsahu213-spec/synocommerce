# Developer SDK & Plugin Hooks Specification

## Overview

SynoCommerce Developer SDK for registering UI widgets, payment providers, shipping carriers, and event webhooks.

---

## SDK Example

```typescript
import { SynoMarketplaceEngine } from '@marketplace/marketplace-engine';

const engine = new SynoMarketplaceEngine();
engine.installExtension('ext_razorpay_pro');
```
