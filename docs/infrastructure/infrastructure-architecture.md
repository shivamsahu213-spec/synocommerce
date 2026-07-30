# SynoCommerce Enterprise Infrastructure Architecture

## 1. Infrastructure Layer Responsibilities

The **Infrastructure Layer** (`src/infrastructure/`) fulfills outbound ports defined by the Application Layer (`src/application/ports/`) and persistence interfaces declared in the Domain Layer (`src/domain/*/repositories/`).

```
       +-------------------------------------------------+
       |                APPLICATION LAYER                |
       |     (IPaymentPort, IShippingPort, ITaxPort)     |
       +-------------------------------------------------+
                                |
                                v (Dependency Inversion)
       +-------------------------------------------------+
       |               INFRASTRUCTURE LAYER              |
       |  (StripeAdapter, FedExAdapter, AvalaraAdapter)  |
       +-------------------------------------------------+
                                |
                                v
       +-------------------------------------------------+
       |   Third-Party SDKs / Databases / Cloud APIs     |
       +-------------------------------------------------+
```

---

## 2. Adapter Pattern & Vendor Encapsulation

External SDKs (Stripe, PayPal, FedEx, UPS, Avalara, Twilio, SendGrid, Algolia, S3) are strictly isolated inside vendor adapters:
- **No Vendor SDK Leaks**: Application and Domain code never import vendor libraries.
- **Pluggable Factory**: `PaymentGatewayFactory` and `ShippingCarrierFactory` instantiate specific provider adapters at runtime based on configuration.

---

## 3. Repository Pattern Implementation

Repository adapters (`src/infrastructure/repositories/`) map domain entities to/from underlying database drivers:
- **Domain Independence**: Database models, ORM schemas, and SQL tables are private implementation details.
- **Persistence Agnostic**: The domain operates entirely on `AggregateRoot` and `Entity` objects.

---

## 4. Transactional Outbox Pattern & Inbox Pattern

To ensure reliable, eventual consistency without two-phase commits:
- **Outbox Pattern** (`src/infrastructure/messaging/outbox-inbox.ts`): Domain state changes and integration events are written atomically to an outbox table in the same database transaction. A background worker reads unprocessed outbox messages and dispatches them to message brokers.
- **Inbox Pattern**: Incoming external webhooks/events are stored in an inbox ledger to guarantee idempotent processing.

---

## 5. Provider-Neutral Messaging & Event Dispatching

- **Integration Event Dispatching**: Dispatches `IIntegrationEvent`s to message brokers (RabbitMQ, Kafka, AWS SNS/SQS).
- **Dead Letter Queue (DLQ)**: Retain failed event deliveries for inspection and manual replay.
- **Event Replay Manager**: Re-publishes past event streams for system recovery or audit reconstruction.

---

## 6. Caching Strategy

The caching subsystem (`src/infrastructure/cache/`) provides:
- Multi-tier caching (`InMemoryCacheAdapter` L1, `RedisCacheAdapter` L2).
- Automatic TTL handling and fallback strategies for query acceleration.

---

## 7. Cloud Storage Strategy

Storage adapters (`src/infrastructure/storage/`) implement `IStoragePort`:
- **AWS S3** (`S3StorageAdapter`)
- **Cloudflare R2** (`CloudflareR2StorageAdapter`)
- **Azure Blob Storage** (`AzureBlobStorageAdapter`)
- **Local Storage** (`LocalStorageAdapter` for local dev/testing)

---

## 8. Observability & Telemetry

- **Structured Logging**: `ConsoleLoggerAdapter` / Winston logger producing JSON log entries with correlation IDs.
- **OpenTelemetry**: Metrics and distributed tracing via `OpenTelemetryAdapter`.
- **Health Checks**: `InfrastructureHealthIndicator` evaluating database, cache, and queue readiness.

---

## 9. Infrastructure Security

- **Encryption & Hashing**: AES-256 encryption (`DefaultCryptoAdapter`) and bcrypt/argon2 hashing.
- **Secrets & Key Management**: Encapsulated behind `ISecretManagerAdapter` and `IKeyManagerAdapter`.

---

## 10. Deployment & Infrastructure Scaling Strategy

- **Stateless Infrastructure**: All adapters are stateless, allowing horizontal scaling across serverless or containerized environments (Kubernetes, AWS ECS, Vercel).
- **Graceful Degradation**: Fallback mechanisms ensure database read-replicas or secondary payment gateways activate automatically on primary outage.
