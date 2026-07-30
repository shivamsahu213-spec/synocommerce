# Tax Bounded Context

## Overview

The `tax` bounded context provides global multi-jurisdiction tax calculation,
VAT/GST support, tax rate resolution, tax rules, and breakdown auditing.

## Core Principles

- **Vendor Neutral**: Avalara, TaxJar, and custom engines implement ports
  outside the domain — no third-party SDKs leak into domain contracts.
- **Identifier-Only Coupling**: References categories and jurisdictions by id;
  never embeds foreign aggregates.
- **Event-Driven Lifecycle**: Rate activation/deactivation and calculations
  emit immutable domain events.

## Core Components

| Kind | Name |
|------|------|
| Aggregate | `TaxRateAggregate` |
| Entities | `TaxCategoryEntity`, `TaxRuleEntity` |
| Value Objects | `TaxIdentifier`, `TaxBreakdown`, `TaxCalculation` |
| Ports | `ITaxResolver`, `ITaxEngine` |
| Policies | `ITaxPolicy` |
| Specifications | `TaxApplicableSpecification`, `TaxRateActiveSpecification` |
