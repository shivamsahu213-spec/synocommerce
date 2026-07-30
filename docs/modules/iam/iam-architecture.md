# SynoCommerce Identity & Access Management (IAM) Module Architecture

## 1. IAM Module Architecture Overview

The **SynoCommerce IAM Module** (`src/modules/iam/`) is a production-ready, zero-dependency security framework handling user identity, multi-tenant/store authorization, session management, multi-factor authentication (MFA), and personal access tokens (API Keys).

```
                      +------------------------------------------+
                      |         IAM REST CONTROLLER              |
                      |   (/auth/*, /sessions/*, /mfa/*, /keys)   |
                      +------------------------------------------+
                                           |
                                           v
                      +------------------------------------------+
                      |        IAM APPLICATION SERVICES          |
                      |  (Auth, Authorization, Session, ApiKey)  |
                      +------------------------------------------+
                                           |
                                           v
                      +------------------------------------------+
                      |           IAM DOMAIN AGGREGATES          |
                      |   (UserAggregate, Role, Session, ApiKey) |
                      +------------------------------------------+
```

---

## 2. Authentication Flow

1. **User Registration** (`POST /auth/register`):
   - Validates email format via `Email` value object.
   - Generates cryptographically secure PBKDF2 salt and hash (`HashedPassword`).
   - Assigns default `customer` role and transitions user to `PENDING_VERIFICATION`.
2. **User Authentication** (`POST /auth/login`):
   - Validates email and PBKDF2 hash using `crypto.timingSafeEqual` to prevent timing attacks.
   - Tracks failed login attempts; locks account after 5 consecutive failures for 15 minutes.
   - If MFA is enabled, returns `isMfaRequired: true` requiring TOTP challenge verification.
   - Creates a new `SessionEntity` recording device user agent and IP address.

---

## 3. Authorization Flow & Permission Model

- **Role Inheritance**: Roles support inheritance chains (e.g. `super_admin` inherits `admin` which inherits `manager`).
- **Wildcard Permission Matching**:
  - `*`: Global super-admin bypass.
  - `domain:*` (e.g., `cart:*`): Grants all actions within the `cart` domain.
- **Tenant & Store Context Awareness**: Authorization evaluates user `tenantId` and `storeId` constraints.

---

## 4. Multi-Factor Authentication (TOTP)

- Implements standard **RFC 6238 TOTP (Time-Based One-Time Password)** using Node.js `node:crypto`.
- Generates QR code URI (`otpauth://totp/...`).
- Validates 6-digit one-time passcodes across current, previous (-1), and next (+1) 30-second time windows to account for client clock drift.

---

## 5. Session Management & API Keys

- **Session Revocation**: Active sessions can be queried (`GET /sessions`) and explicitly revoked (`DELETE /sessions/:id`).
- **Personal Access Tokens / API Keys**:
  - Keys format: `syno_sk_[prefix]_[secret]`.
  - Stored in database as SHA-256 hashes (`keyHash`).
  - Supports scoped permission arrays, expiration dates, and tenant/store boundaries.

---

## 6. Audit Logging & Security Events

- Automatically logs all critical security events (`USER_LOGIN_SUCCESS`, `USER_LOGIN_FAILED`, `USER_REGISTERED`, `PASSWORD_CHANGED`, `MFA_ENABLED`, `SESSION_REVOKED`, `API_KEY_CREATED`, `API_KEY_REVOKED`).
