# Observability Architecture

## Providers to Prepare

- Sentry
- PostHog
- Google Analytics
- Microsoft Clarity
- OpenTelemetry

## Design Principles

- Use provider-agnostic interfaces in platform config
- Initialize observability through dedicated bootstrap files
- Keep business features unaware of vendor SDK specifics
- Attach environment, brand, route, and correlation metadata consistently

## Planned Integration Shape

- `src/observability/clients/*` for provider adapters
- `src/observability/events/*` for typed event contracts
- `src/observability/index.ts` for unified bootstrap/export surface
