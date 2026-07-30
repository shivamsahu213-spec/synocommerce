# Orders Bounded Context

## Overview
The `orders` bounded context forms the transactional heart of SynoCommerce. It models order aggregates, line items, state transitions, order payment status, shipments, invoices, and timeline history.

## Architectural Principles
- **Loose Coupling**: References products, customers, and warehouses solely via value object identifiers (`SKU`, `CustomerIdentifier`, `WarehouseIdentifier`).
- **Immutable Financial Auditability**: Line item pricing, tax, and order totals are snapshotted at placement time.
