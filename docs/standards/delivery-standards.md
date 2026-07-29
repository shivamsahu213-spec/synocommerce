# Delivery Standards

## Branching Strategy

- `main`: releasable code only
- `develop`: integration branch if parallel streams require it
- Branch names: `feat/...`, `fix/...`, `chore/...`, `docs/...`, `refactor/...`

## Versioning Strategy

- Semantic Versioning (`MAJOR.MINOR.PATCH`)
- Breaking architecture changes increment `MAJOR`
- Backward-compatible platform additions increment `MINOR`
- Fixes and tooling-only corrections increment `PATCH`

## Review Checklist

- Architecture boundaries preserved
- No hidden coupling introduced
- Runtime config remains validated
- Error, loading, and empty states considered
- Security and observability implications documented

## Definition of Done

- Code is lint-clean and type-safe
- Tests or relevant checks pass
- Documentation and ADRs are updated as needed
- Release notes impact is understood
- No placeholder logic leaks into production paths
