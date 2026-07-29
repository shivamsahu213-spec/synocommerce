# Security Policy

## Supported Versions

Only the latest `main` branch and the latest tagged release are supported for security fixes.

## Reporting a Vulnerability

Do not open public issues for vulnerabilities.

- Contact: `security@synostack.com`
- Include: impact, reproduction steps, affected paths, proposed mitigations
- Expected acknowledgement: within 2 business days

## Security Baseline

- Environment variables are validated before runtime use
- Third-party providers must be accessed through configuration and adapter boundaries
- Secrets must never be committed to the repository
