# Pricing Bounded Context Architecture

## Overview
The `pricing` bounded context manages price strategies, multi-currency conversion, tax classes, price books, discount rules, and dynamic pricing engine contracts within SynoCommerce.

## Architectural Components & Interfaces
- **BasePrice**: Base product list price value representation.
- **SalePrice**: Discounted promotional price.
- **CompareAtPrice**: Original MSRP or strikethrough comparison price.
- **PriceBook**: Tiered, customer-group, or region-specific price catalog.
- **PriceRule**: Rule definition for conditional price adjustments.
- **TaxClass**: Tax rate classification and VAT/sales tax rules.
- **CurrencyConversion**: Exchange rate evaluation contract.
- **IPricingPolicy**: Policy contract for price calculation.
- **IPricingEngine**: Primary domain service interface for dynamic price evaluation.
- **IDiscountPolicy**: Discount eligibility and combination rules.

## Data Access
Repository contracts defined for `IPriceBookRepository`, `IPriceRuleRepository`, `ITaxClassRepository`, and `ICurrencyConversionRepository`.
