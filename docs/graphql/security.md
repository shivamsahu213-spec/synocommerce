# GraphQL Security, Complexity & Depth Limiting

## Overview

Security guardrails preventing GraphQL DoS attacks via AST Depth Limiting and Query Cost Complexity Analysis.

---

## Security Limits

- **Max AST Depth**: 7 levels.
- **Max Cost Budget**: 100 points per request.
- **N+1 Prevention**: DataLoader batching.
