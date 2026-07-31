# SynoCommerce Enterprise B2B Commerce Platform Architecture

## 1. Executive Summary

The **SynoCommerce Enterprise B2B Commerce Platform** (`src/modules/b2b/`) provides enterprise procurement capabilities comparable to Shopify Plus B2B, Adobe Commerce B2B, and SAP Commerce B2B.

```
                    +--------------------------------------------------+
                    |             ENTERPRISE B2B PLATFORM              |
                    |     (B2bCompanyEngine, B2bContractPricing)       |
                    +--------------------------------------------------+
                                             |
             +-------------------------------+-------------------------------+
             |                               |                               |
             v                               v                               v
    +-----------------+             +-----------------+             +-----------------+
    | CORPORATE ACCTS |             | CONTRACT PRICING|             | RFQ & PURCHASE  |
    | (Net 30/Credit) |             | (Private Catalogs)|           | ORDERS          |
    +-----------------+             +-----------------+             +-----------------+
```

---

## 2. Corporate Accounts & Credit Limits

Implemented in [company-engine.ts](file:///d:/SynoCommerce/src/modules/b2b/company-engine.ts):

- **Payment Terms**: `DUE_ON_RECEIPT`, `NET_15`, `NET_30`, `NET_45`, `NET_60`.
- **Credit Limit & Hold Enforcement**: Validates available credit line (`creditLimitInr - outstandingBalanceInr`) before approving purchase order checkouts.

---

## 3. Negotiated Contract Pricing

Implemented in [contract-pricing.ts](file:///d:/SynoCommerce/src/modules/b2b/contract-pricing.ts):

- Allows setting negotiated contract prices per SKU and company account, automatically overriding list prices when threshold quantities are ordered.

---

## 4. Request For Quote (RFQ) & Purchase Orders

Implemented in [rfq-engine.ts](file:///d:/SynoCommerce/src/modules/b2b/rfq-engine.ts) & [purchase-orders.ts](file:///d:/SynoCommerce/src/modules/b2b/purchase-orders.ts):

- **RFQ Lifecycle**: `SUBMITTED` -> `UNDER_REVIEW` -> `COUNTER_OFFERED` -> `ACCEPTED`.
- **Purchase Orders**: Tracks PO numbers, invoice attachments, and approval workflows.
