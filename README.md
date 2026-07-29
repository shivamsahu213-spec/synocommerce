# SynoCommerce

SynoCommerce is the reusable enterprise ecommerce platform foundation for SynoStack Technologies.

## Goals

- Enable multiple client storefronts from one codebase.
- Separate business features from brand and theme concerns.
- Support internationalization, multi-currency, and future B2B expansion.
- Establish strict engineering standards before feature delivery.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- TanStack Query
- Zustand
- next-intl
- Zod

## Core Structure

- `src/app` for routing and framework entry points
- `src/config` for runtime, environment, feature, and navigation configuration
- `src/features` for vertical business modules
- `src/shared` for reusable primitives, providers, hooks, and platform utilities
- `src/theme` for token, brand, and theme registries
- `src/store` for client state
- `src/types` for cross-cutting contracts
- `docs` for long-form engineering documentation

## Getting Started

1. Install dependencies with `npm install`
2. Copy `.env.example` to `.env.local`
3. Run `npm run dev`

## Quality Gates

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run format:check`
- `npm run check`

## Governance

- Commit messages follow Conventional Commits
- Releases follow Semantic Versioning
- GitHub Actions enforce lint, typecheck, test, build, and dependency audit
- Engineering standards live under `docs/standards`
