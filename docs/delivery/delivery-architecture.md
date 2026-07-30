# SynoCommerce Enterprise Delivery Layer Architecture

## 1. Delivery Layer Responsibilities

The **Delivery Layer** (`src/delivery/`) acts as the Interface Adapter layer exposing SynoCommerce use cases to external clients. It represents every entry point into the system: REST APIs, GraphQL endpoints, Webhook listeners, CLI commands, Background workers, Cron schedulers, and gRPC/RPC endpoints.

```
+-----------------------------------------------------------------------------------+
|                                  EXTERNAL CLIENTS                                 |
|          (Web / Mobile Storefronts / Admin Dashboard / Third-Party Webhooks)      |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                   DELIVERY LAYER                                  |
|   (REST Controllers / GraphQL Resolvers / Webhook Handlers / Middleware Pipeline) |
+-----------------------------------------------------------------------------------+
                                          |
                                          v (Calls Use Cases & Application Services)
+-----------------------------------------------------------------------------------+
|                                 APPLICATION LAYER                                 |
|             (CQRS Commands & Queries / Mediators / Result<T> Containers)          |
+-----------------------------------------------------------------------------------+
```

---

## 2. REST API Strategy

- **Controller Abstractions** (`src/delivery/controllers/`): Interfaces (`ICartController`, `IOrderController`, `IPaymentController`) delegate request processing directly to Application Services or Mediators.
- **Framework Agnostic**: Controllers receive `DeliveryRequest` objects and return `DeliveryResponse` containers, allowing adapter bindings to Fastify, Express, NestJS, or Hono.
- **Pagination, Sorting & Filtering**: Standardized `PaginationOptions`, `CursorPaginationOptions`, `SortOption`, and `FilterOption` types.

---

## 3. GraphQL Strategy

- **Federation Readiness**: Schema and resolver contracts (`src/delivery/graphql/` & `src/delivery/resolvers/`) support Apollo Federation entity resolution and metadata.
- **DataLoaders**: `IDataLoader<TKey, TValue>` prevents N+1 query overhead across batch fetches.
- **Subscriptions & Persisted Queries**: Subscriptions support real-time delivery events (`ISubscriptionResolver`), while `IPersistedQueryStrategy` accelerates query parsing.

---

## 4. Webhook Strategy

- **Incoming Webhook Verification**: `IWebhookSignatureVerifier` verifies HMAC SHA-256 signatures for incoming provider webhooks (e.g. Stripe, PayPal, FedEx).
- **Outgoing Webhooks & Retries**: `IOutgoingWebhookDispatcher` signs payloads and dispatches webhooks with backoff retries and Dead Letter Queue (DLQ) fallback.

---

## 5. API Versioning Strategy

Declared in `src/delivery/versioning/`:
- **URI Versioning**: `/api/v1/orders` vs. `/api/v2/orders`.
- **Header Versioning**: `X-Api-Version: v2`.
- **Content Negotiation**: `Accept: application/vnd.synocommerce.v2+json`.
- **Deprecation Policy**: Transmits RFC 8594 `Sunset` and `Deprecation` response headers.

---

## 6. Middleware Pipeline Architecture

Framework-agnostic middleware (`src/delivery/middleware/`) wraps HTTP handlers:
1. `ICorrelationIdMiddleware`
2. `ITenantResolutionMiddleware`
3. `IAuthenticationMiddleware`
4. `IAuthorizationMiddleware`
5. `ILocalizationMiddleware`
6. `IRateLimitingMiddleware`
7. `ICachingMiddleware`
8. `ICompressionMiddleware`
9. `ISecurityHeadersMiddleware`
10. `IRequestLoggingMiddleware`

---

## 7. API Standards & Error Strategy

- **Explicit RFC 7807 Problem Details**: Errors translate to `ApiProblemDetailsResponse` with standardized status codes (`400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `429 Rate Limit Exceeded`).
- **Zero Entity Exposure**: Delivery DTOs match Application DTO contracts. Domain entities are never exposed to HTTP clients.

---

## 8. OpenAPI Architecture

Defined in `src/delivery/openapi/`:
- `IOpenApiGenerator` automatically synthesizes OpenAPI 3.1 specifications from registered route groups, schema registries, and operation tags.

---

## 9. Background Workers & CLI Architecture

- **CLI Commands** (`src/delivery/cli/`): Architecture for system commands (`create-store`, `seed-data`, `rebuild-search`, `reindex-products`, `clear-cache`, `migrate`, `backup`, `health-check`).
- **Workers & Scheduler** (`src/delivery/workers/` & `src/delivery/scheduler/`): Workers (`IQueueWorker`, `ISearchIndexingWorker`, `IDlqWorker`) consume queue jobs and schedule cron tasks without duplicating application logic.

---

## 10. Deployment Model

- **Adapter Binding**: The Delivery Layer can be deployed as a monolithic Fastify server, microservice worker processes, or Vercel/AWS Lambda serverless endpoints simply by attaching the HTTP framework driver to `IRouterAdapter`.
