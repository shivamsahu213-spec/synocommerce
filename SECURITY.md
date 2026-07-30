# SynoCommerce Security Governance Policy

## Security Model & Principles

SynoCommerce enforces enterprise security controls across every architectural layer:

1. **Cryptographic Standards**: Native Node.js `node:crypto` PBKDF2 with 10,000 iterations, unique 16-byte random salts, and SHA-512 hashes.
2. **Timing-Safe Equality**: All credential verification uses `crypto.timingSafeEqual` to eliminate timing side-channel attacks.
3. **Brute-Force Lockout**: 5 consecutive invalid authentication failures lock accounts automatically for 15 minutes.
4. **Multi-Factor Authentication (MFA)**: RFC 6238 TOTP engine built with native HMAC-SHA1.
5. **Webhook Integrity**: HMAC SHA-256 signatures for payment and shipping webhook validation.
6. **Role-Based Access Control (RBAC)**: Fine-grained permission matching (`catalog:*`, `orders:*`, `payments:refund`, `kernel:*`) with wildcard support.

## Reporting Vulnerabilities

Please report security issues directly to security@synocommerce.com. Responsible disclosures are investigated within 24 hours.
