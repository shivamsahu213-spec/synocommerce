# Features

## Planned Platform Modules

- Catalog
- Search
- Pricing
- Cart
- Checkout
- Accounts
- CMS
- Loyalty
- Reviews
- B2B
- Subscriptions
- Marketplace

## Feature Rules

- Each feature owns its UI, API layer, types, schemas, and orchestration hooks.
- Shared primitives move to `src/shared` only when reused across multiple features.
- Feature modules should expose stable public entry points to reduce coupling.
