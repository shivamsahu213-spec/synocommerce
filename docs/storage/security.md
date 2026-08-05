# Storage Security, Virus Scanning & Integrity Verification

## Overview

SynoCommerce enforces automated virus scanning, SHA256 checksum computation, MIME type whitelist validation, and presigned access tokens.

---

## Security Safeguards

- **SHA256 Integrity**: Every file upload receives a 64-character SHA256 checksum verification.
- **Virus Scanning**: Automated scan hook rejects malware and EICAR test signatures.
- **Signed Tokens**: Time-limited signed upload and download URLs using `crypto.timingSafeEqual`.
