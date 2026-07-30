# Fulfillment Bounded Context

## Overview

The `fulfillment` bounded context orchestrates warehouse allocation, pick lists,
packing slips, and order fulfillment workflows. It coordinates with shipping for
dispatch without embedding WMS vendor SDKs in the domain layer.

## Core Principles

- **Warehouse Neutral**: Allocation and assignment adapters implement
  `IFulfillmentEngine`, `IWarehouseAssignmentService`, and `IAllocationService`
  in infrastructure.
- **Identifier-Only Coupling**: References orders via `OrderIdentifier` and
  warehouses via `WarehouseIdentifier` — never embeds foreign aggregates.
- **Event-Driven Lifecycle**: State transitions emit immutable domain events
  (`FulfillmentStarted`, `ItemsAllocated`, `ItemsPacked`, `ItemsShipped`,
  `FulfillmentCompleted`).

## Core Components

| Kind | Name |
|------|------|
| Aggregate | `FulfillmentAggregate` |
| Entities | `FulfillmentTaskEntity` |
| Value Objects | `FulfillmentIdentifier`, `FulfillmentStatus`, `WarehouseAssignment`, `AllocationResult` |
| Ports | `IFulfillmentEngine`, `IWarehouseAssignmentService`, `IAllocationService` |
| Policies | `IFulfillmentPolicy` |
| Specifications | `FulfillmentReady`, `FulfillmentCompleted` |
