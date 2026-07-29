# Platform Core

The `src/platform` layer contains reusable framework infrastructure for SynoCommerce.

## Goals

- Keep business modules independent from infrastructure vendors
- Provide typed contracts for extensibility and plugin loading
- Centralize lifecycle, configuration, observability, and security abstractions
- Support future multi-tenant, multi-brand, and multi-provider workloads

## Design Rules

- Contracts first, implementations later
- No vendor SDKs inside platform contracts
- Tree-shakeable modules with explicit public barrels
- No business feature logic in platform infrastructure
