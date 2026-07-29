# Architecture

## Principles

- Keep framework concerns at the edge.
- Organize domain capabilities as vertical feature slices.
- Centralize cross-cutting primitives in shared modules.
- Isolate theme and brand concerns from feature logic.
- Prefer configuration and contracts over hardcoded variations.

## Layers

### App Layer

`src/app` contains the Next.js routing tree, layout entry points, and route-level composition only.

### Configuration Layer

`src/config` owns environment parsing, platform runtime settings, navigation maps, and feature flags.

### Theme Layer

`src/theme` owns design tokens, brand definitions, and theme registries so storefront identity changes do not require feature rewrites.

### Feature Layer

`src/features` is reserved for business modules such as catalog, cart, checkout, account, pricing, or B2B.

### Shared Layer

`src/shared` contains reusable UI primitives, providers, platform hooks, and low-level utilities.

### State Layer

`src/store` handles app-wide client state that must survive navigation but should remain independent from server cache.

## Future Ready Concerns

- `next-intl` prepares locale-aware routing and messaging.
- TanStack Query establishes a standard for API caching and synchronization.
- Theme registry enables multi-brand delivery.
- Config contracts support payments, shipping, analytics, and SEO abstraction.
