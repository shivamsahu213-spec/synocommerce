# Inventory Bounded Context

## Overview
The `inventory` bounded context models enterprise multi-warehouse stock management, inventory reservations, location allocation, stock movements, and inventory policy enforcement in SynoCommerce.

## Architectural Model
- **WarehouseAggregate**: Represents physical or virtual fulfillment nodes.
- **InventoryItemEntity**: Tracks SKU-level stock levels, safety thresholds, and reservations per location.
- **InventoryReservation**: Temporary stock allocation tied to active carts or checkout sessions.
- **InventoryAllocator Domain Service**: Allocates stock across locations based on fulfillment rules.

## Domain Relationships
References `SKU` and `Identifier` from `shared-domain`. No direct references to Product or Order entities.
