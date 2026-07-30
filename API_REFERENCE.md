# SynoCommerce API Reference Summary

## IAM Delivery REST Endpoints

- `POST /auth/register`: Register new user account.
- `POST /auth/login`: Authenticate credentials & issue session token.
- `POST /auth/verify`: Verify email address.
- `GET /me`: Retrieve active user profile.
- `POST /mfa/enable` & `POST /mfa/verify`: Configure & validate RFC 6238 TOTP.
- `GET /sessions` & `DELETE /sessions/:id`: Manage user security sessions.
- `POST /api-keys` & `DELETE /api-keys/:id`: Issue & revoke access API keys.

## Commerce Engine Core APIs

- **CartEngine**: `calculateTotals(cart, regionCode)`.
- **CheckoutEngine**: `startCheckout(cart)`, `setShippingAddress(id, addr)`, `completeCheckout(id, cart, provider)`.
- **PricingEngine**: `calculateUnitPrice(sku, quantity, currency)`.
- **PromotionEngine**: `applyCoupon(code, subtotal)`.
- **InventoryEngine**: `reserveStock(sku, quantity)`, `getAvailableStock(sku)`.
