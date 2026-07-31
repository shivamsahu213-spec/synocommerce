# SynoCommerce Enterprise API Platform & Developer Portal Architecture

## 1. Executive Summary

The **SynoCommerce Enterprise API Platform & Developer Portal** (`src/modules/api-platform/`, `portal/developers/`) provides developer platform capabilities comparable to Shopify Developers, Stripe Developers, and Twilio.

```
                    +--------------------------------------------------+
                    |           ENTERPRISE API GATEWAY PLANE           |
                    |     (ApiGatewayEngine, RateLimiter, Scopes)      |
                    +--------------------------------------------------+
                                             |
             +-------------------------------+-------------------------------+
             |                               |                               |
             v                               v                               v
    +-----------------+             +-----------------+             +-----------------+
    | OPENAPI 3.1     |             | WEBHOOK DISPATCH|             | MULTI-LANG SDK  |
    | (Postman Specs) |             | (HMAC & Replay) |             | (TS/Py/Go/Java) |
    +-----------------+             +-----------------+             +-----------------+
```

---

## 2. API Gateway & Scopes Control

Implemented in [api-gateway.ts](file:///d:/SynoCommerce/src/modules/api-platform/api-gateway.ts):

- **Scopes**: `read:catalog`, `write:orders`, `manage:customers`, `admin:all`.
- **Token-Bucket Rate Limiter**: Throttles consumer requests (`validateRequest`) based on key limit parameters (default 100 req/min).

---

## 3. OpenAPI 3.1 & Postman Collections

Implemented in [openapi-generator.ts](file:///d:/SynoCommerce/src/modules/api-platform/openapi-generator.ts):

- Auto-generates standard OpenAPI 3.1 JSON schemas (`generateOpenApi31Spec`) and Postman Collection v2.1 specifications (`generatePostmanCollection`).

---

## 4. Webhook Engine & Event Replay

Implemented in [webhook-engine.ts](file:///d:/SynoCommerce/src/modules/api-platform/webhook-engine.ts):

- **HMAC SHA-256 Signatures**: Computes signatures per payload with endpoint secrets (`computeSignature`).
- **Event Replay**: Enables manual or automated replay of past webhook payloads (`replayWebhookEvent`).
