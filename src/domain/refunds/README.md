# Refunds Bounded Context

## Overview

The `refunds` bounded context manages partial or full monetary refund
calculations, refund lines, approval workflows, and gateway refund execution.

## Core Principles

- **Identifier-Only Coupling**: References `OrderIdentifier`, `PaymentIdentifier`,
  and optional `ReturnIdentifier` — never embeds foreign aggregates.
- **Event-Driven Lifecycle**: State transitions emit immutable domain events.
- **Calculation First**: `IRefundEngine` produces `RefundCalculation` before
  creating the aggregate.

## Core Components

| Kind | Name |
|------|------|
| Aggregate | `RefundAggregate` |
| Entity | `RefundLineEntity` |
| Value Objects | `RefundIdentifier`, `RefundCalculation` |
| Ports | `IRefundEngine`, `IRefundApprovalService` |
| Policies | `IRefundPolicy` |
| Specifications | `RefundAllowedSpecification`, `RefundProcessableSpecification` |

## Lifecycle

```
PENDING -> APPROVED -> PROCESSED
                    \-> FAILED
       \-> REJECTED
```
