# SynoCommerce Developer Onboarding Guide

## Welcome to SynoCommerce!

This guide provides everything you need to start extending and building on SynoCommerce.

### 1. Architecture Map

- **Domain Core** (`src/domain/`): Pure TypeScript business logic and value objects.
- **Application Services** (`src/app/`): Use case orchestrators.
- **Infrastructure Adapters** (`src/infrastructure/`): DB, Redis, Stripe, Shiprocket adapters.
- **Delivery Layer** (`src/delivery/`): REST controllers, GraphQL resolvers, webhooks.
- **Developer CLI** (`tools/cli/`): Tooling executable (`syno`).

### 2. Creating Your First Plugin

Run the Syno CLI code generator:
```bash
npx tsx tools/cli/index.ts generate plugin custom-analytics
```

This generates `src/plugins/custom-analytics.plugin.ts` inheriting `BaseSynoPlugin`.
