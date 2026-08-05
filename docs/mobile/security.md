# Mobile SDK Security, Certificate Pinning & Device Trust

## Overview

SynoCommerce Mobile SDK enforces TLS certificate pinning, encrypted local storage, device jailbreak/root detection, and biometric authentication.

---

## Security Features

- **Certificate Pinning**: Rejects MITM proxy inspection by matching SHA256 certificate public key hashes.
- **Jailbreak / Root Detection**: Rejects app initialization on compromised devices.
- **Encrypted Local Cache**: AES-256-CBC token encryption in storage.
