# Error Handling Strategy

## Error Categories

- API errors: transport, timeout, upstream outage, malformed payload
- Validation errors: client-side schema failure, server contract mismatch
- Authentication errors: expired session, missing token, forbidden action
- Route errors: `404`, `403`, `500`, and unexpected render failures

## Global Approach

- Normalize errors into a shared application error contract
- Handle server and client failures differently
- Retry only idempotent requests with bounded policies
- Surface user-facing feedback through a future notification adapter

## Framework Strategy

- `not-found.tsx` handles missing routes or resources
- `error.tsx` handles route-segment failures
- Shared API client maps transport failures to domain-safe errors
- Error boundary components capture client rendering failures

## UI State Standards

- Every async surface must define loading, empty, error, and success states
- Empty states should be intentional, not silent blanks
- Logging and observability hooks should enrich errors with correlation metadata
