# SynoCommerce Enterprise Admin Platform Architecture

## 1. Executive Summary

The **SynoCommerce Enterprise Admin Platform** (`apps/admin/`) is an enterprise-grade administration dashboard built using Next.js 15, React 19, TailwindCSS, and shadcn/ui. It connects directly with the underlying **IAM Module** (`src/modules/iam/`) and **Commerce Kernel** (`src/kernel/`).

```
                              +-------------------------------------------+
                              |         NEXT.JS 15 APP ROUTER             |
                              | (/dashboard, /catalog, /orders, /users)   |
                              +-------------------------------------------+
                                                    |
                                                    v
                              +-------------------------------------------+
                              |         REACT 19 FEATURE VIEWS            |
                              |   (Dashboard, Catalog, Orders, Plugins)   |
                              +-------------------------------------------+
                                                    |
                                                    v
                              +-------------------------------------------+
                              |         IAM MODULE & KERNEL               |
                              |   (AuthenticationService, UserAggregate)  |
                              +-------------------------------------------+
```

---

## 2. Tech Stack

- **Framework**: Next.js 15 App Router
- **UI & Logic**: React 19, TypeScript
- **Styling**: TailwindCSS & custom dark/light theme provider
- **Icons**: Lucide React
- **Security & IAM**: Integrated with SynoCommerce `AuthenticationService` and `AuthorizationService`
- **Data Table**: Reusable `DataTable` with pagination, sorting, search filtering, bulk actions, and CSV export.

---

## 3. Key Feature Modules

1. **Dashboard** (`apps/admin/src/features/dashboard/`):
   - Executive metrics: Revenue ($248,920.00), Total Orders (1,420), Active Customers (3,890), System Health (99.98%).
   - Sales revenue stream visualization.
   - Low stock inventory alert monitors.
   - Recent order activity stream.
2. **Catalog Management** (`apps/admin/src/features/catalog/`):
   - Product CRUD, SKU tracking, stock management, categories, and variant counts.
   - Interactive Add Product modal with validation.
3. **Order Operations** (`apps/admin/src/features/orders/`):
   - Order tracking, payment status badges, fulfillment status, and order detail side-drawers.
   - Order activity timeline, invoice generation, and refund triggers.
4. **Customer Management** (`apps/admin/src/features/customers/`):
   - Lifetime value tracking, order history, addresses, and customer status.
5. **Users & Role Access Control** (`apps/admin/src/features/users/`):
   - IAM RBAC integration, administrator accounts, MFA status indicators, and permission matrix rules.
6. **Plugin Manager** (`apps/admin/src/features/plugins/`):
   - Extension discovery, category filters, versioning, and real-time Enable/Disable toggles.
7. **Global System Settings** (`apps/admin/src/features/settings/`):
   - Store localization, default currency/locale selection, and live Kernel Feature Flag toggles.

---

## 4. Performance & Accessibility Compliance

- **Zero Layout Shifts**: Fixed header and sidebar dimensions with responsive drawer overlays.
- **Dark/Light Mode**: Dynamic theme switcher via `ThemeProvider`.
- **Keyboard & Reader Accessibility**: Semantic HTML table structures, accessible ARIA roles, and form inputs.
