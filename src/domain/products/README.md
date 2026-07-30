# Products Bounded Context

## Overview
The `products` bounded context contains the core aggregate roots, entities, value objects, lifecycle state machine, and specifications governing product items and SKUs in SynoCommerce.

## Core Aggregates & Entities
- **ProductAggregate**: Product root aggregate with status management (Draft, Published, Archived).
- **ProductVariantEntity**: Distinct SKU variant entity with pricing, weight, dimensions, and attribute options.
