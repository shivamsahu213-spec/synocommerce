# Architectural Decisions

## ADR-001 Vertical Features

Business capabilities will be added as isolated feature slices to reduce coupling and support independent evolution.

## ADR-002 Theme Registry

Brand and theme definitions are registry-driven to support multi-client delivery from one codebase.

## ADR-003 Shared Platform Layer

Only true cross-cutting primitives belong in `src/shared`; business behavior stays in feature modules.
