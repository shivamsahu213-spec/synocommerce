# SynoCommerce Enterprise SaaS & Multi-Tenant Platform Architecture

## 1. Executive Summary

The **SynoCommerce Central SaaS Control Plane** (`platform/saas/`, `portal.synocommerce.com`) enables automated multi-tenant store provisioning, subscription billing overages, custom domain SSL routing, and one-click cloud deployments.

```
                    +--------------------------------------------------+
                    |          CENTRAL SAAS CONTROL PLANE              |
                    |     (SaaSControlPlane, SubscriptionMetering)     |
                    +--------------------------------------------------+
                                             |
             +-------------------------------+-------------------------------+
             |                               |                               |
             v                               v                               v
    +-----------------+             +-----------------+             +-----------------+
    | TENANT ISOLATION|             | ONE-CLICK DEPLOY|             | CUSTOM DOMAINS  |
    | (DB/Redis/S3)   |             | (Vercel/AWS/K8s)|             | (SSL & CNAME)   |
    +-----------------+             +-----------------+             +-----------------+
```

---

## 2. Multi-Tenant Data Isolation

Implemented in [tenant-control-plane.ts](file:///d:/SynoCommerce/platform/saas/tenant-control-plane.ts):

- **Database Isolation**: Dedicated PostgreSQL schemas per store (`tenant_<tenantId>_<storeId>`).
- **Redis Isolation**: Key namespace prefixing (`syno:<tenantId>:<storeId>:`).
- **Storage & Search Isolation**: Dedicated S3 bucket folders (`tenants/<tenantId>/<storeId>/`) and Meilisearch namespaces (`idx_<tenantId>_<storeId>_`).

---

## 3. Subscription Tiers & Billing Metering

Implemented in [subscription-billing.ts](file:///d:/SynoCommerce/platform/saas/subscription-metering.ts):

- **Tiers**: `STARTER` ($299/mo), `PROFESSIONAL` ($999/mo), `BUSINESS` ($1,999/mo), `ENTERPRISE` ($2,999/mo), `AGENCY` ($4,999/mo).
- **Overage Metering**: Calculates automated per-order overage fees ($0.08/order) when monthly plan thresholds are exceeded.

---

## 4. One-Click Multi-Cloud Deployment

Implemented in [deployment-wizard.ts](file:///d:/SynoCommerce/platform/saas/deployment-wizard.ts):

- Provisions one-click deployments to Vercel, AWS ECS, GCP Cloud Run, Azure App Service, DigitalOcean App Platform, and Kubernetes.
