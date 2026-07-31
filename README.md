# SynoCommerce Enterprise Commerce Framework

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/synostack/synocommerce)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-MIT%2FCommercial-green.svg)](LICENSE)

**SynoCommerce** is an enterprise-grade, headless, multi-tenant ecommerce framework built with Next.js 15, React 19, TypeScript, Clean Architecture, and Domain-Driven Design (DDD).

It combines a zero-runtime-dependency security core with an executable Commerce Engine, an Enterprise Admin Platform, a Headless Storefront, a Visual Drag-and-Drop Page Builder, SaaS Operations Tooling, and a 5-minute automated installer CLI.

---

## 🌟 Why SynoCommerce?

| Feature | SynoCommerce | Shopify Plus | Medusa JS | Adobe Commerce (Magento) |
| :--- | :---: | :---: | :---: | :---: |
| **Architecture** | Hexagonal / Clean DDD | Closed SaaS | Node.js Monolith | PHP Monolith |
| **Multi-Tenancy** | Native Control Plane | Enterprise Only | Plugin-based | Multi-store DB |
| **Native Security** | Native `node:crypto` PBKDF2/TOTP | Proprietary | Third-party Auth | Third-party Auth |
| **Visual Page Builder** | Integrated Drag-and-Drop | Theme Editor | Requires Third-Party | Page Builder |
| **Developer Tooling** | `syno` CLI & `.synopkg` | Shopify CLI | Medusa CLI | Magento CLI |
| **Deployment Flexibility** | Docker / K8s / Vercel / Cloud | Cloud Only | Node / Cloud | On-Prem / Cloud |

---

## 🏗️ Architecture Overview

```
src/
├── domain/                  # DDD Aggregate Roots, Entities, Value Objects
├── platform/                # Core Contracts, Event Bus, DI Container
├── app/                     # Framework-agnostic Use Cases & DTOs
├── infrastructure/          # Repository Adapters (PostgreSQL, Redis, S3, Stripe, FedEx)
├── delivery/                # REST, GraphQL Federation, Webhook, CLI & Worker Entry Points
├── kernel/                  # Module Discovery, Lifecycle & License Engine
├── modules/
│   ├── iam/                 # PBKDF2/SHA-512 Auth, TOTP MFA, Account Lockout, RBAC
│   ├── commerce-engine/     # Cart, Checkout, Pricing, Promotions, Inventory, Orders, Returns
│   └── cms/                 # Drag-and-Drop Page Builder, Block Registry, SSR Renderer
apps/
├── admin/                   # Next.js 15 Enterprise Administration Platform
└── storefront/              # Next.js 15 Headless Storefront
tools/
├── cli/                     # Syno Developer CLI (`syno generate`, `doctor`, `deploy`)
├── installer/               # Automated Store Generator (`syno create-store` & AI Prompt)
└── marketplace/             # Extension Registry & `.synopkg` Package Verifier
platform/
└── operations/              # Multi-tenant Provisioner, Subscription Billing, K8s Blue-Green
stores/
├── kalyan-ayurvedic/        # First Production Store (Bhilai, Chhattisgarh)
├── starter-fashion/         # Apparel & Fashion Starter Preset
└── starter-electronics/     # Smart Electronics Starter Preset
```

---

## 🚀 Quick Start (5 Minutes)

### Option A: Automated Store Generator CLI

```bash
# Clone the repository
git clone https://github.com/synostack/synocommerce.git
cd synocommerce

# Install dependencies
npm install

# Run the automated store installer
npx tsx tools/cli/index.ts init
```

### Option B: Local Docker Environment

```bash
# Launch PostgreSQL, Redis, Meilisearch, MinIO, API, Admin, Storefront, Workers
docker compose up --build
```

- **Admin Dashboard**: `http://localhost:3001`
- **Headless Storefront**: `http://localhost:3002`
- **Core API & Health**: `http://localhost:3000/api/health`

---

## 📖 Documentation & Guides

- [Developer Onboarding Guide](docs/developer/developer-onboarding-guide.md)
- [Operations & Kubernetes Guide](docs/operations/operations-platform-architecture.md)
- [Integrations Guide](docs/integrations/integration-platform-architecture.md)
- [Visual CMS Guide](docs/cms/visual-cms-architecture.md)
- [Production Go-Live Guide](docs/deployment/production-go-live-guide.md)

---

## 📜 License & Governance

SynoCommerce is dual-licensed under the **MIT License** for open-source community development and the **SynoCommerce Enterprise Commercial License** for multi-tenant SaaS cloud distribution.
