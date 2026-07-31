# SynoCommerce Enterprise Integration Hub Architecture

## 1. Executive Summary

The **SynoCommerce Enterprise Integration Hub** (`src/modules/integration-hub/`) enables enterprise commerce connectivity with SAP S/4HANA, Oracle ERP, Microsoft Dynamics, Salesforce CRM, HubSpot, Amazon, and Shiprocket.

```
                    +--------------------------------------------------+
                    |        ENTERPRISE INTEGRATION HUB PLANE          |
                    |     (SyncEngineProcessor, DeadLetterQueue)       |
                    +--------------------------------------------------+
                                             |
             +-------------------------------+-------------------------------+
             |                               |                               |
             v                               v                               v
    +-----------------+             +-----------------+             +-----------------+
    |  ERP CONNECTORS |             |  CRM CONNECTORS |             |  MARKETPLACE    |
    | (SAP/Oracle/Dyn)|             | (Salesforce/Hub)|             | (Amazon/Ship)   |
    +-----------------+             +-----------------+             +-----------------+
```

---

## 2. Bidirectional Sync & Conflict Engine

Implemented in [sync-engine.ts](file:///d:/SynoCommerce/src/modules/integration-hub/sync-engine.ts):

- **Sync Modes**: `FULL`, `INCREMENTAL`, `REAL_TIME`.
- **Conflict Resolution Strategies**: `ERP_MASTER` (ERP data overrides local), `COMMERCE_MASTER`, `LATEST_WINS`.
- **Dead Letter Queue (DLQ)**: Holds failed webhook and API sync payloads for manual or automated retry processing (`retryDlqItem`).

---

## 3. Enterprise Connectors

- **ERP Connectors** ([ErpConnectorEngine](file:///d:/SynoCommerce/src/modules/integration-hub/erp-connector.ts#L12)): SAP S/4HANA, SAP Business One, Oracle ERP, Microsoft Dynamics 365, Odoo, ERPNext.
- **CRM Connectors** ([CrmConnectorEngine](file:///d:/SynoCommerce/src/modules/integration-hub/crm-connector.ts#L9)): Salesforce, HubSpot, Zoho CRM, Freshsales.
- **Marketplace & Logistics** ([MarketplaceLogisticsConnectorEngine](file:///d:/SynoCommerce/src/modules/integration-hub/marketplace-logistics.ts#L7)): Amazon, Flipkart, eBay, Shiprocket, FedEx, UPS, DHL.
