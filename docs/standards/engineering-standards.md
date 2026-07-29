# Engineering Standards

## Folder Conventions

- `src/app`: routing, layouts, route handlers, framework composition
- `src/config`: runtime, environment, platform, provider, and feature configuration
- `src/features`: vertical feature slices only
- `src/platform`: framework infrastructure, contracts, abstractions, and extension points
- `src/shared`: cross-feature UI, hooks, providers, and low-level libraries
- `src/store`: app-scoped client state only
- `src/theme`: brands, tokens, theme registries, and presentation contracts

## Naming Conventions

- Files: kebab-case
- React components: PascalCase exports, kebab-case filenames
- Hooks: `use-*` filenames and `use*` exports
- Stores: `*.store.ts`
- Config files: `*.config.ts`
- Types: domain-oriented names, avoid `I*` prefixes

## Import Conventions

- Use path aliases for cross-module imports
- Keep local relative imports shallow
- Prefer barrel exports at module boundaries, not inside every folder

## Component Conventions

- Default to Server Components unless interactivity requires otherwise
- Keep UI primitives generic and theme-aware
- Avoid feature-specific branching in shared components

## Hook Conventions

- Keep hooks side-effect focused
- Separate data fetching hooks from pure state hooks
- Avoid hidden global mutations inside hooks

## Store Conventions

- Zustand stores hold UI/session state, not server cache
- Expose narrow setters and selectors
- Persist only when a product requirement exists

## API Conventions

- API access goes through shared clients or feature adapters
- Validate external inputs and normalize DTOs before UI usage
- Separate transport failures from domain validation failures
