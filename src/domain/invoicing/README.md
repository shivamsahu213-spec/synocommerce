# Invoicing Bounded Context

## Overview

The `invoicing` bounded context manages formal invoice generation, tax line
compliance, invoice numbers (`InvoiceNumber`), invoice totals, and status
lifecycles.

## Core Principles

- **Identifier-Only Coupling**: References orders via `OrderIdentifier` only —
  never embeds foreign aggregates.
- **Event-Driven Lifecycle**: Issue, pay, cancel, and void emit immutable events.
- **Number Integrity**: `InvoiceNumber` is non-empty and normalized to uppercase.

## Core Components

| Kind | Name |
|------|------|
| Aggregate | `InvoiceAggregate` |
| Entity | `InvoiceLineEntity` |
| Value Objects | `InvoiceIdentifier`, `InvoiceNumber`, `InvoiceTotals` |
| Ports | `IInvoiceGenerator`, `IInvoiceValidationService` |
| Policies | `IInvoicePolicy` |
| Specifications | `ValidInvoiceSpecification`, `InvoiceIssuableSpecification` |

## Lifecycle

```
DRAFT -> ISSUED -> PAID
                \-> VOID
     \-> CANCELLED
ISSUED -> CANCELLED
```
