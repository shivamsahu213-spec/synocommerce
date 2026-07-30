# Shared Domain Bounded Context

## Overview
The `shared-domain` bounded context provides enterprise-wide, framework-independent, immutable kernel types, value objects, domain errors, and interfaces that are shared across all bounded contexts in SynoCommerce.

## Design Principles
- **Framework Agnostic**: Pure TypeScript types and immutability with zero external dependencies.
- **Value Semantics**: Equality is structural, based on value comparison rather than reference identity.
- **Self-Validating**: Invariants are enforced upon construction.

## Core Reusable Value Objects
- `Identifier`: Strongly-typed entity identifier value object.
- `Money`: Immutable monetary amount and ISO 4217 currency.
- `Currency`: ISO 4217 3-letter currency code representation.
- `Locale`: BCP 47 language and region tag representation.
- `Slug`: URL-safe normalized slug string.
- `SKU`: Stock Keeping Unit format wrapper.
- `Quantity`: Non-negative integer quantity representation.
- `Percentage`: 0–100 decimal percentage value object.
- `Weight`: Mass measurement value and unit (kg, g, lb, oz).
- `Dimension`: 3D physical dimension measurement (length, width, height, unit).
- `Email`: Validated RFC-compliant email address.
- `PhoneNumber`: E.164 compliant phone number value object.
- `Address`: Universal postal and physical address model.
- `SeoMetadata`: Search engine optimization meta tags and open graph metadata.
- `DateRange`: Immutable start and end timestamp interval.
- `AuditMetadata`: Record creation and update audit fields.
