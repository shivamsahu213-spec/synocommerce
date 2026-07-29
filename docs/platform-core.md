# Platform Core Architecture

## Overview

The Platform Core introduces a dedicated `src/platform` layer that sits below business features and above framework/runtime specifics.

## Key Decisions

- Dependency injection is contract-first through `container`, `providers`, and `kernel`
- Plugins integrate through manifests and capability contracts instead of hardcoded vendor branches
- Events are strongly typed and middleware-ready through `events` and `event-bus`
- Security, observability, performance, storage, and search are prepared as abstractions only
- Each module exports a public barrel to preserve explicit boundaries and future code splitting

## Folder Tree

```text
src/platform/
  application/
  analytics/
  bootstrap/
  cache/
  configuration/
  container/
  currency/
  environment/
  event-bus/
  events/
  extensions/
  feature-flags/
  http/
  hydration/
  kernel/
  localization/
  logging/
  media/
  middleware/
  monitoring/
  network/
  notifications/
  permissions/
  pipeline/
  plugins/
  providers/
  queue/
  routing/
  scheduler/
  search/
  security/
  seo/
  serialization/
  storage/
  telemetry/
  uploads/
  validation/
```

## Extension Points

- Service providers
- Plugin manifests
- Event bus middleware
- Route registry
- Feature flag resolvers
- Notification senders
- Storage drivers
- Search drivers

## Future Roadmap

1. Add minimal in-memory reference implementations for local development
2. Introduce platform bootstrap composition in app startup
3. Wire typed platform config into runtime config adapters
4. Add provider test harnesses and contract tests
5. Add plugin discovery and sandboxing policy
