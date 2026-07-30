# Returns Bounded Context

## Overview

The `returns` bounded context manages customer return requests (RMA), return
authorizations, return items, return eligibility windows, and receipt status.

## Core Principles

- **Identifier-Only Coupling**: References orders via `OrderIdentifier` only —
  never embeds foreign aggregates.
- **Event-Driven Lifecycle**: State transitions emit immutable domain events.
- **RMA Integrity**: Authorization snapshots are issued only on approval.

## Core Components

| Kind | Name |
|------|------|
| Aggregate | `ReturnAggregate` |
| Entity | `ReturnItemEntity` |
| Value Objects | `ReturnIdentifier`, `ReturnAuthorization`, `ReturnWindow` |
| Ports | `IReturnValidationService`, `IRMAService` |
| Policies | `IReturnPolicy` |
| Specifications | `ReturnAllowedSpecification`, `ReturnWindowOpenSpecification` |

## Lifecycle

```
REQUESTED -> APPROVED -> ITEMS_RECEIVED -> COMPLETED
         \-> REJECTED
```
