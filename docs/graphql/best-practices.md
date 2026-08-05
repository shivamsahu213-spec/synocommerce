# GraphQL Schema Design Best Practices

## Overview

Best practices for designing Apollo Federation v2 subgraphs, `@key` directives, `@extends` entity resolution, and breaking change governance.

---

## Guidelines

1. Use `@key(fields: "id")` for entity extensions.
2. Keep queries flat to prevent depth violations.
