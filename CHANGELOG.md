# Changelog

All notable changes to the SynoCommerce Enterprise Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-rc1] - 2026-07-30

### Added
- **Platform Core & Architecture**: Clean Architecture, Domain-Driven Design (DDD), Hexagonal Architecture, Multi-Tenant Engine, Event Bus.
- **Identity & Access Management (IAM)**: PBKDF2/SHA-512 authentication, timing-safe checks, account lockout, RFC 6238 TOTP, RBAC permissions matrix.
- **Enterprise Admin Platform**: Next.js 15 App Router administration dashboard (`apps/admin/`) with executive metrics, product CRUD, order side-drawers, plugin manager, and settings.
- **Commerce Engine**: Core runtime (`src/modules/commerce-engine/`) executing Cart, Checkout, Pricing, Promotions, Inventory, Orders, Payments, Shipping, Tax, Returns, Search, Recommendations.
- **Headless Storefront**: Next.js 15 App Router storefront (`apps/storefront/`) with PDP, Catalog filtering, Search, Slide-over Cart Drawer, Express Checkout, and Customer Account sign-in.
- **Developer Platform & CLI**: Developer CLI (`tools/cli/`) and Extension SDK (`tools/sdk/`) with code generators (`syno generate`), system doctor (`syno doctor`), and marketplace packager (`.synopkg`).
- **Operations Platform**: Multi-tenant provisioner, SaaS subscription billing, license key manager, observability & 99.99% SLO tracking, automated snapshot backup/restore, Kubernetes Blue-Green deployment orchestrator (`platform/operations/`).
- **Integration Platform**: External provider adapters for Stripe, Adyen, PayPal, FedEx, UPS, Avalara, TaxJar, Meilisearch, Salesforce, SAP, Google SSO, and OpenTelemetry/Prometheus telemetry (`src/integrations/`).

### Security
- Native `node:crypto` cryptographic hashing, timing-safe string comparison, HMAC SHA-256 webhook signatures, zero third-party runtime npm vulnerabilities.
