# SynoCommerce Enterprise Storefront Framework Architecture

## 1. Executive Summary

The **SynoCommerce Enterprise Storefront Framework** (`apps/storefront/`) is a production-grade headless storefront constructed with Next.js 15, React 19, TailwindCSS, and Lucide React. It consumes the underlying **Commerce Engine** (`src/modules/commerce-engine/`) and **IAM Module** (`src/modules/iam/`).

```
                    +--------------------------------------------------+
                    |           NEXT.JS 15 APP ROUTER STOREFRONT       |
                    |   (/, /products, /products/[id], /cart, /checkout)  |
                    +--------------------------------------------------+
                                             |
                                             v
                    +--------------------------------------------------+
                    |          STOREFRONT CONTEXT PROVIDER             |
                    |   (Cart State, Wishlist, Currency, Auth Session) |
                    +--------------------------------------------------+
                                             |
                                             v
                    +--------------------------------------------------+
                    |           COMMERCE ENGINE & IAM MODULES          |
                    |  (CartEngine, CheckoutEngine, Pricing, Search)   |
                    +--------------------------------------------------+
```

---

## 2. Tech Stack

- **Framework**: Next.js 15 App Router
- **UI & Logic**: React 19, TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Integration**: Direct binding to `CommerceEngine` submodules and `AuthenticationService`

---

## 3. Core Storefront Feature Modules

1. **Home Page** (`apps/storefront/src/features/home/`):
   - Hero banner, Trust Badges, Featured Hardware Grid, Newsletter signup.
2. **Catalog Page** (`apps/storefront/src/features/catalog/`):
   - Category filtering, price sorting (`asc` / `desc`), item grid.
3. **Product Detail Page (PDP)** (`apps/storefront/src/features/products/`):
   - Image gallery, in-stock badge, quantity selector, Wishlist toggle, Add to Cart action, and related product recommendations (`RecommendationEngine`).
4. **Search Page** (`apps/storefront/src/features/search/`):
   - Multi-attribute term search, autocomplete term suggestions (`SearchEngine`), zero results fallback.
5. **Slide-over Cart Drawer & Cart Page** (`apps/storefront/src/features/cart/`):
   - Slide-over overlay, quantity adjustments, coupon application (`WELCOME10`), subtotal, discounts, tax estimates, shipping estimates, grand total.
6. **Express Checkout** (`apps/storefront/src/features/checkout/`):
   - Multi-step checkout (`SHIPPING -> PAYMENT -> CONFIRMATION`) executing stock reservations, Stripe payment capture, and order creation (`CheckoutEngine`).
7. **Customer Account** (`apps/storefront/src/features/account/`):
   - IAM authentication sign-in, customer profile, order history, active security sessions.

---

## 4. SEO & Search Engine Compliance

- **XML Sitemap**: Dynamic endpoint (`/sitemap.xml`) indexing active storefront product URLs.
- **Robots.txt**: Endpoint (`/robots.txt`) restricting crawlers from sensitive checkout and account routes.
- **OpenGraph & Metadata**: Product titles, category metadata, and structured JSON-LD support.
