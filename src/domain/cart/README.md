# Cart Bounded Context

## Overview
The `cart` bounded context encapsulates shopping cart aggregates, cart item entities, discount applications, price totals, and cart expiration/merging policies in SynoCommerce.

## Key Aggregates & Entities
- **CartAggregate**: Primary aggregate root managing cart state, currency, customer/guest identity, line items, and discount coupons.
- **CartItemEntity**: Line item entity referencing SKU and quantity with item unit prices and subtotal calculations.
