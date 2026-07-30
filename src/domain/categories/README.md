# Categories Bounded Context

## Overview
The `categories` bounded context encapsulates taxonomy management, hierarchical category trees, category positioning, and parent-child navigation rules within SynoCommerce.

## Domain Model
- **Category Aggregate Root**: Manages category identity, metadata, parent reference, children list, and display order.
- **Hierarchical Invariants**: Prevents circular ancestry dependencies and invalid parent assignments.
