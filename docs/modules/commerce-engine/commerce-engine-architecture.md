# SynoCommerce Commerce Engine Architecture

## 1. Executive Summary

The **SynoCommerce Commerce Engine** (`src/modules/commerce-engine/`) is the central runtime responsible for executing end-to-end commerce workflows. It operates purely at the domain/application level—independent of UI, databases, and HTTP transport layers.

```
       +------------------------------------------------------------+
       |                      CHECKOUT ENGINE                       |
       |  (Multi-Step Checkout Session & State Transition Manager)  |
       +------------------------------------------------------------+
                                     |
       +-----------------------------+-----------------------------+
       |                             |                             |
       v                             v                             v
+--------------+              +--------------+              +--------------+
| CART ENGINE  |              |  INVENTORY   |              |   PAYMENT    |
| (Guest/User  |              |    ENGINE    |              |    ENGINE    |
| Cart Totals) |              | (Allocation) |              | (Auth/Capture|
+--------------+              +--------------+              +--------------+
       |                                                           |
       v                                                           v
+--------------+                                            +--------------+
|   PRICING    |                                            | ORDER ENGINE |
|  PROMOTIONS  |                                            | (Order State |
|  TAX ENGINE  |                                            |   Machine)   |
+--------------+                                            +--------------+
```

---

## 2. Cart & Checkout Lifecycle

1. **Cart Aggregate** ([CartAggregate](file:///d:/SynoCommerce/src/modules/commerce-engine/cart/cart-engine.ts#L33)):
   - Manages items, quantity updates, coupon code applications, and guest-to-customer cart merging.
2. **Totals Calculation** ([CartEngine](file:///d:/SynoCommerce/src/modules/commerce-engine/cart/cart-engine.ts#L79)):
   - Evaluates subtotal, applies promotion discounts (`PromotionEngine`), calculates regional taxes (`TaxEngine`), and computes shipping estimates.
3. **Checkout Session** ([CheckoutEngine](file:///d:/SynoCommerce/src/modules/commerce-engine/checkout/checkout-engine.ts#L30)):
   - Transitions through `SHIPPING -> PAYMENT -> REVIEW -> CONFIRMED`.
   - Reserves inventory for all items atomically before payment.
   - Executes payment authorization & capture via `PaymentEngine`.
   - Generates the final immutable `OrderRecord`.

---

## 3. Pricing & Promotion Strategy

- **Pricing Engine** ([PricingEngine](file:///d:/SynoCommerce/src/modules/commerce-engine/pricing/pricing-engine.ts#L27)):
  - Evaluates Price Books, sale pricing, volume tier pricing (e.g. 5+ units = $70), and currency conversion.
- **Promotion Engine** ([PromotionEngine](file:///d:/SynoCommerce/src/modules/commerce-engine/promotions/promotion-engine.ts#L22)):
  - Evaluates coupon codes, percentage discounts, fixed-amount discounts, free shipping, minimum subtotal thresholds, and stacking rules.

---

## 4. Inventory Allocation & Safety Stock

- **Stock Reservation**: Reserves item stock with configurable time-to-live (TTL) during checkout.
- **Safety Stock**: Protects against overselling by reserving buffer stock (`onHandQuantity - reservedQuantity - safetyStock`).

---

## 5. Order Engine & State Machine

- **Order States**: `PENDING -> PAID -> PROCESSING -> SHIPPED -> DELIVERED` (or `CANCELLED`).
- **Cancellation & Refunds**: `ReturnEngine` handles RMA requests, inspection workflows, restocking, and automated payment gateway refunds.

---

## 6. Search & Recommendation Engine

- **Search Engine** ([SearchEngine](file:///d:/SynoCommerce/src/modules/commerce-engine/search/search-engine.ts#L24)):
  - In-memory indexing, multi-attribute filtering (category, brand, price range), sorting, and instant autocomplete.
- **Recommendation Engine** ([RecommendationEngine](file:///d:/SynoCommerce/src/modules/commerce-engine/recommendations/recommendation-engine.ts#L10)):
  - Related product matching by category and user-level recently viewed history tracking.
