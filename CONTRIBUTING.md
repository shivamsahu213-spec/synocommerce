# Contributing

## Standards

- Keep changes modular and production-oriented.
- Do not mix brand customization with feature logic.
- Prefer extending config, theme, or feature contracts before adding exceptions.
- Use strict TypeScript and runtime validation for new boundaries.

## Workflow

1. Create or pick the correct module boundary.
2. Add or update contracts first.
3. Implement behavior in the narrowest responsible layer.
4. Validate with lint, typecheck, and formatting.
5. Update documentation if architecture or contracts change.

## Branch Quality

- No dead code
- No demo data in production modules
- No direct API calls inside unrelated UI components
- No theme-specific business branching in shared features
