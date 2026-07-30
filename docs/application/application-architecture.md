# SynoCommerce Enterprise Application Layer Architecture

## 1. Application Architecture Overview

The **Application Layer** (`src/application/`) serves as the orchestrator of business workflows in SynoCommerce. Positioned directly between presentation/APIs and the core domain layer, it implements standard Clean Architecture and Hexagonal Architecture principles.

```
       +-------------------------------------------------+
       |         Presentation Layer (APIs / Web / CLI)    |
       +-------------------------------------------------+
                                |
                                v
       +-------------------------------------------------+
       |                APPLICATION LAYER                |
       |  (CQRS / Mediators / Pipelines / Use Cases / Ports) |
       +-------------------------------------------------+
           |                                       |
           v                                       v
+-----------------------+              +-----------------------+
|     DOMAIN LAYER      |              | INFRASTRUCTURE LAYER  |
| (Aggregates/Entities) |              |  (Adapters via Ports) |
+-----------------------+              +-----------------------+
```

---

## 2. CQRS Pattern (Command Query Responsibility Segregation)

Commands and Queries are strictly segregated to isolate state-mutating operations from read-only queries:

- **Commands** (`src/application/commands/`): Express explicit intent to alter system state (`CreateCart`, `PlaceOrder`, `AuthorizePayment`). Return `Result<T>`.
- **Queries** (`src/application/queries/`): Request state projection data (`GetProduct`, `GetCart`, `SearchProducts`). Read-only, side-effect free.
- **Handlers** (`src/application/handlers/`): Independent `ICommandHandler` and `IQueryHandler` components executing single responsibilities.

---

## 3. Mediator Pattern

The **IMediator** contract (`src/application/mediators/`) decouples use-case requestors from execution handlers:
- `send<TResult>(command)`: Routes commands through pipeline behaviors to their matching command handler.
- `query<TResult>(query)`: Routes queries through pipeline behaviors to their matching query handler.
- `publish<TNotification>(event)`: Dispatches integration events to registered notification handlers.

---

## 4. Pipeline Behaviors (Middleware Chain)

Command and Query processing flows through a sequence of `IPipelineBehavior<TRequest, TResponse>` middleware stages:

```
[Incoming Request]
       |
       v
 1. LoggingPipelineBehavior
       |
       v
 2. MetricsPipelineBehavior
       |
       v
 3. IdempotencyPipelineBehavior
       |
       v
 4. CachingPipelineBehavior
       |
       v
 5. AuthorizationPipelineBehavior
       |
       v
 6. ValidationPipelineBehavior
       |
       v
 7. RetryPipelineBehavior
       |
       v
 8. TransactionPipelineBehavior
       |
       v
 9. AuditPipelineBehavior
       |
       v
[ Business Use Case Handler ]
```

---

## 5. Transaction Flow & Unit of Work

Transactional integrity is maintained via `ITransactionManager` and `IUnitOfWork` contracts (`src/application/transactions/`):
- Guarantees atomic commits and rollbacks across multiple domain repositories within a use-case boundary.
- Supports isolation levels (`READ_COMMITTED`, `SERIALIZABLE`) without leaking database specifics into application code.

---

## 6. DTO Strategy

Data Transfer Objects (`src/application/dto/`) enforce strict contracts for request input and response output:
- **Zero Entity Leakage**: Domain Aggregates and Entities are never exposed directly beyond the Application Layer boundary.
- **Value Mapping**: `IMapper<TSource, TTarget>` translates domain entities into flat, immutable DTOs for safe serialization.

---

## 7. Use Case Strategy

Use Cases (`src/application/use-cases/`) implement `IUseCase<TInput, TOutput>`:
- Encapsulate a single business operation.
- Depend exclusively on Domain contracts and Application Ports.
- Are 100% framework-agnostic, persistent-agnostic, and vendor-neutral.

---

## 8. Port Strategy (Hexagonal Architecture)

Application Ports (`src/application/ports/`) define outbound contracts for external capabilities:
- `IPaymentPort`
- `IShippingPort`
- `ITaxPort`
- `INotificationPort`, `IEmailPort`, `ISMSPort`
- `IAnalyticsPort`, `ISearchPort`, `IStoragePort`

Infrastructure adapters implement these ports outside the Application Layer.

---

## 9. Application Integration Events

Integration Events (`src/application/events/`) implement `IIntegrationEvent` for asynchronous inter-system messaging:
- `OrderPlacedIntegrationEvent`
- `PaymentCapturedIntegrationEvent`
- `ShipmentDeliveredIntegrationEvent`
- `CustomerRegisteredIntegrationEvent`

Unlike Domain Events (which capture internal aggregate changes), Integration Events communicate state changes to external systems via message brokers.

---

## 10. Error & Result Pattern Strategy

Expected failures avoid throw/catch overhead by returning `Result<T, E>` containers (`src/application/results/`):
- `Result.ok(value)`
- `Result.fail(error)`
- Standardized `ProblemDetails` (RFC 7807) and `ValidationResult` contracts provide predictable error handling across presentation layers.
