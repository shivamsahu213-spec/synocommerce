# API Strategy

## Frontend Boundary

- All HTTP traffic flows through shared API clients or feature API modules.
- DTO transformation should happen before data reaches UI components.
- Query keys and caching policies should be standardized.
- Provider-specific adapters should be injected through config, not hardcoded into features.

## Planned Integrations

- Laravel REST API
- Auth endpoints
- Pricing and promotion services
- Inventory services
- CMS endpoints
- Payment and shipping adapters

## Principles

- Typed contracts
- Centralized error handling
- Authentication-aware transport
- Retry only where safe
- Clear adapter boundaries for third-party services
