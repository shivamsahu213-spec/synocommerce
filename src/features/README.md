# Features Architecture

Every business capability lives inside `src/features` as an isolated vertical slice.

Recommended structure per feature:

- `api/` for feature-specific network clients and DTO mapping
- `components/` for UI owned by that feature
- `hooks/` for orchestrating feature workflows
- `schemas/` for Zod validation contracts
- `services/` for business logic and transformation
- `types/` for feature-local types

Examples that can be added later:

- `catalog`
- `cart`
- `checkout`
- `account`
- `search`
- `cms`
- `pricing`
- `b2b`
