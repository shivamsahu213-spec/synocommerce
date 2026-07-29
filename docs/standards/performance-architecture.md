# Performance Architecture

## Defaults

- Prefer Server Components for non-interactive rendering
- Use dynamic imports for heavy client-only modules
- Keep caching decisions explicit per route and data source
- Optimize images through Next.js image pipeline and remote allowlists

## Prepared Concerns

- Streaming boundaries for large data surfaces
- Suspense-based lazy loading for client islands
- Edge runtime only for latency-sensitive, compatible workloads
- Future PWA support through isolated service-worker architecture

## Review Rules

- Every new dependency needs a bundle impact review
- Every client component should justify its existence
- Avoid global providers that force unnecessary client hydration
