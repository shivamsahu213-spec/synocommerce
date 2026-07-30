# Financial & Fulfillment Domain Architecture Documentation

## Overview
This document specifies the architectural model for the **Financial & Fulfillment Domain** (Sprint 3) of SynoCommerce. It models provider-neutral payment processing, carrier-independent shipping operations, warehouse fulfillment orchestration, global multi-jurisdiction tax calculation, customer returns (RMA), partial/full refunds, and tax-compliant invoice generation.

---

## 1. Bounded Context Map

```
                             +-------------------+
                             |   Order Domain    |
                             +-------------------+
                                       |
     +-----------------+---------------+---------------+-----------------+
     |                 |               |               |                 |
     v                 v               v               v                 v
+----------+     +-----------+   +------------+   +---------+       +---------+
| Payments |     | Invoicing |   |Fulfillment |   |   Tax   |       | Returns |
+----------+     +-----------+   +------------+   +---------+       +---------+
     |                                 |                                 |
     v                                 v                                 v
+----------+                     +-----------+                     +---------+
| Refunds  |                     | Shipping  |                     | Refunds |
+----------+                     +-----------+                     +---------+
```

---

## 2. Aggregate Relationships & Id-Only References

In compliance with strict Domain-Driven Design rules:
* **PaymentAggregate** references `OrderIdentifier` and `CustomerIdentifier` value objects.
* **ShipmentAggregate** references `OrderIdentifier` and `CarrierIdentifier`.
* **FulfillmentAggregate** references `OrderIdentifier` and `WarehouseIdentifier`.
* **InvoiceAggregate** references `OrderIdentifier` and `InvoiceNumber`.
* **ReturnAggregate** references `OrderIdentifier` and `CustomerIdentifier`.
* **RefundAggregate** references `OrderIdentifier`, `PaymentIdentifier`, and optional `ReturnIdentifier`.

---

## 3. Payment Lifecycle

```
[ PENDING ] ---> PaymentInitiatedEvent
     |
     v
[ AUTHORIZED ] ---> PaymentAuthorizedEvent
     |
     +---> [ VOIDED ] ---> PaymentVoidedEvent
     |
     v
[ CAPTURED ] ---> PaymentCapturedEvent
     |
     +---> [ DISPUTED ] ---> PaymentDisputedEvent
     |
     v
[ REFUNDED ] ---> PaymentRefundCompletedEvent
```

---

## 4. Shipment Lifecycle

```
[ DRAFT ] ---> ShipmentCreatedEvent
    |
    v
[ PACKED ] ---> ShipmentPackedEvent
    |
    v
[ DISPATCHED / IN_TRANSIT ] ---> ShipmentDispatchedEvent & TrackingUpdatedEvent
    |
    +---> [ RETURNED ] ---> ShipmentReturnedEvent
    |
    v
[ DELIVERED ] ---> ShipmentDeliveredEvent
```

---

## 5. Fulfillment Flow Sequence

```
 OrderPlacedEvent
       |
       v
 FulfillmentEngine.processFulfillment()
       |
       v
 WarehouseAssignmentService -> [ AllocationResult ] -> ItemsAllocatedEvent
       |
       v
 PickList & PackingSlip Generation -> ItemsPackedEvent
       |
       v
 ShipmentDispatchedEvent -> FulfillmentCompletedEvent
```

---

## 6. Tax Flow

1. Address passed to `ITaxResolver`.
2. `ITaxJurisdiction` retrieved based on Country/State.
3. `ITaxEngine.calculateTax()` evaluates applicable `ITaxRate` and produces `TaxCalculation` with `TaxBreakdown[]`.
4. Emits `TaxCalculatedEvent`.

---

## 7. Return & Refund Flow Sequence

```
 Customer requests RMA -> ReturnRequestedEvent
          |
 RMA Approved -> ReturnApprovedEvent (ReturnAuthorization issued)
          |
 Items Received -> ItemsReceivedEvent
          |
 RefundEngine calculates total -> RefundCreatedEvent -> RefundApprovedEvent
          |
 PaymentGateway executes refund -> PaymentRefundCompletedEvent & RefundProcessedEvent
```

---

## 8. Invoice Lifecycle

```
 OrderPlacedEvent -> InvoiceGenerator -> [ InvoiceAggregate (ISSUED) ] -> InvoiceGeneratedEvent
                                                  |
                               PaymentCapturedEvent -> InvoiceAggregate (PAID)
                                                  |
                             OrderCancelledEvent -> InvoiceAggregate (CANCELLED) -> InvoiceCancelledEvent
```

---

## 9. Vendor-Neutral Extension Strategy

* **Payment Gateways**: Third-party providers (Stripe, PayPal, Adyen) implement `IPaymentGateway` in the infrastructure layer.
* **Carriers**: Shipping logistics providers (FedEx, UPS, DHL) implement `IShippingProvider` and `ILabelGenerator` in infrastructure.
* **Tax Engines**: Cloud tax services (Avalara, TaxJar) implement `ITaxEngine` in infrastructure without mutating domain contracts.
