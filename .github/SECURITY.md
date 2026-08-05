# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within SynoCommerce, please send an email to `security@synocommerce.com`.

All vulnerabilities will be promptly acknowledged and assessed within 24 hours.

## Encryption & Auth Controls
- Native `node:crypto` PBKDF2 with 100,000 iterations & SHA-512.
- AES-256-GCM field-level envelope encryption.
- RFC 6238 TOTP Multi-Factor Authentication.
