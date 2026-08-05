# Multi-CDN Edge Acceleration & Invalidation

## Overview

SynoCommerce integrates with CloudFront, Cloudflare, Fastly, and Image CDNs for global edge caching and instant invalidation.

---

## Configuration

Set environment variables in `.env.production`:

```env
CLOUDFRONT_DISTRIBUTION_ID=E881923456
CLOUDFLARE_ZONE_ID=prod_zone_id
CLOUDFLARE_API_TOKEN=prod_token
FASTLY_SERVICE_ID=prod_service_id
```
