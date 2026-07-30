# Shipping Bounded Context

## Overview

The `shipping` bounded context provides a carrier-neutral logistics engine. It models
shipments, packages, labels, zones, rate quotes, and tracking events without embedding
FedEx, UPS, DHL, or other carrier SDKs in the domain layer.

## Core Principles

- **Carrier Neutral**: Carrier adapters implement `IShippingProvider`, `ILabelGenerator`,
  and `ITrackingService` in infrastructure.
- **Identifier-Only Coupling**: References orders via `OrderIdentifier` only — never
  embeds foreign aggregates.
- **Event-Driven Lifecycle**: State transitions emit immutable domain events
  (`ShipmentCreated`, `ShipmentPacked`, `ShipmentDispatched`, `ShipmentDelivered`,
  `ShipmentReturned`, `TrackingUpdated`).

## Core Components

| Kind | Name |
|------|------|
| Aggregate | `ShipmentAggregate` |
| Entities | `ShipmentItemEntity`, `ShipmentPackageEntity` |
| Value Objects | `ShipmentIdentifier`, `CarrierIdentifier`, `TrackingIdentifier`, `LabelIdentifier`, `TrackingNumber`, `TrackingEvent`, `DeliveryEstimate`, `ShippingRate` |
| Ports | `IShippingCalculator`, `IShippingProvider`, `ILabelGenerator`, `ITrackingService` |
| Policies | `IShippingPolicy`, `IPackagingPolicy`, `IDeliveryPolicy` |
| Specifications | `ShipmentReady`, `ShippingAllowed`, `PackageValid` |
