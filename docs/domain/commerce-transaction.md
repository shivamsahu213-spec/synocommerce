# Commerce Transaction Domain Architecture Documentation

## Overview
This document specifies the architectural model for the **Commerce Transaction Domain** (Sprint 2) of SynoCommerce. It models inventory management, customer identity, addresses, shopping carts, checkout sessions, and order processing.

---

## 1. Context Map & Bounded Context Relationships

```
+------------------+         +--------------------+
|  Shared Domain   |<--------|  Customer Domain   |
| (Value Objects)  |         +--------------------+
+------------------+                    | (Id)
         ^                              v
         |                   +--------------------+
         +-------------------|   Address Domain   |
         |                   +--------------------+
         |                              | (Id)
         |                              v
         |                   +--------------------+
         +-------------------|    Cart Domain     |
         |                   +--------------------+
         |                              | (Id)
         |                              v
         |                   +--------------------+
         +-------------------|  Checkout Domain   |
         |                   +--------------------+
         |                              | (Id)
         |                              v
         |                   +--------------------+
         +-------------------|    Order Domain    |
         |                   +--------------------+
         |                              ^
         | (SKU / Id)                   | (ReservationId)
         +-------------------+          |
                             |          |
                   +--------------------+
                   |  Inventory Domain  |
                   +--------------------+
```

---

## 2. Aggregate Relationships & Id-Only Referencing Rule

To ensure strict DDD isolation and zero circular dependencies across aggregates:
1. **CartAggregate** references `CustomerIdentifier` (optional) and item `SKU` value objects. It does **not** directly embed `CustomerAggregate` or `ProductAggregate`.
2. **CheckoutSessionAggregate** references `CartIdentifier` and `CustomerIdentifier`.
3. **OrderAggregate** snapshots item details (`SKU`, unit price, title) at time of order creation and references `CustomerIdentifier`.
4. **InventoryItemEntity** references `SKU` and `WarehouseIdentifier`.

---

## 3. Order Lifecycle Diagram

```
 [ PENDING ] ---> OrderPlacedEvent
      |
      v
 [ CONFIRMED ] ---> OrderConfirmedEvent
      |
      +---> [ CANCELLED ] ---> OrderCancelledEvent
      |
      v
 [ PROCESSING ]
      |
      v
 [ SHIPPED ] ---> StockTransferredEvent
      |
      v
 [ DELIVERED / COMPLETED ] ---> OrderCompletedEvent
```

---

## 4. Event Flow Across Bounded Contexts

1. **Cart**: Customer adds item -> `ItemAddedEvent` emitted.
2. **Checkout**: Customer initiates checkout -> `CheckoutStartedEvent` emitted -> `CheckoutSessionAggregate` created.
3. **Inventory**: Inventory allocated & reserved -> `InventoryReservedEvent` emitted with `ReservationIdentifier`.
4. **Order**: Customer confirms payment -> `OrderPlacedEvent` emitted -> `CartAggregate` converted to `OrderAggregate`.
5. **Fulfillment**: Order shipped -> `OrderCompletedEvent` emitted -> Inventory stock converted from reserved to depleted.

---

## 5. Business Rules & Domain Invariants

* **Inventory**: Stock reservations are time-bound (`DateRange`). Expired reservations automatically release allocated quantity back to available stock.
* **Cart**: Cart items preserve unit price and subtotal calculation immutability. Merging guest and customer carts handles duplicate SKUs by aggregating quantities.
* **Checkout**: Transition to step `COMPLETED` requires valid shipping selection, billing selection, and payment selection (`CanCheckoutSpecification`).
* **Order**: Orders in `SHIPPED` or `DELIVERED` status cannot be cancelled (`OrderCancelableSpecification`).

---

## 6. Future Extension Strategy

* **Payments Subsystem (Sprint 3)**: Will integrate via payment intent events without mutating `OrderAggregate` core structure.
* **Shipping & Fulfillment (Sprint 3)**: Will expand `OrderShipment` into dedicated carrier fulfillment bounded context.
* **Returns & Refunds (Sprint 3)**: Will expand `RefundInitiatedEvent` into returns management bounded context.
