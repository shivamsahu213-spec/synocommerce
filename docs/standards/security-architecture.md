# Security Architecture

## Application Security Baseline

- Enforce CSP through centralized header configuration
- Keep secrets in environment-specific stores, never repository files
- Validate all untrusted input at boundaries
- Prefer server-side data access for sensitive operations

## Prepared Patterns

- Authentication middleware for protected route groups
- Authorization policies resolved outside presentation components
- CSRF protection for state-changing browser requests
- Output encoding and React-safe rendering to reduce XSS risk
- Backend parameterized queries to prevent SQL injection
- Request throttling and upstream rate limiting at API boundaries

## Environment Isolation

- Separate local, development, staging, and production secrets
- Disable production integrations by default in local environments
- Guard observability keys and analytics identifiers per environment
