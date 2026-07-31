# SynoCommerce Enterprise Visual CMS & Page Builder Architecture

## 1. Executive Summary

The **SynoCommerce Visual CMS & Drag-and-Drop Page Builder** (`src/modules/cms/`) is a low-code visual page composition platform designed for agencies and merchants.

```
                    +--------------------------------------------------+
                    |           VISUAL CMS CONTROL PLANE               |
                    |    (CmsDocumentEngine, CmsBlockRegistry)        |
                    +--------------------------------------------------+
                                             |
             +-------------------------------+-------------------------------+
             |                               |                               |
             v                               v                               v
    +-----------------+             +-----------------+             +-----------------+
    |  BLOCK REGISTRY |             |  ADMIN BUILDER  |             | STORE RENDERER  |
    | (Hero/Grid/Faq) |             | (Draft/Publish) |             | (SSR Hydration) |
    +-----------------+             +-----------------+             +-----------------+
```

---

## 2. Block Registry & Schema Engine

- **Block Schema Registry** ([CmsBlockRegistry](file:///d:/SynoCommerce/src/modules/cms/block-registry.ts#L15)):
  - Registers block types (`HERO`, `PRODUCT_GRID`, `DOCTOR_RECOMMENDATION`, `TRUST_BADGES`, `NEWSLETTER`).
  - Enforces default props, category groupings, and style configurations.

---

## 3. Document Engine & Versioning

- **Document Engine** ([CmsDocumentEngine](file:///d:/SynoCommerce/src/modules/cms/cms-engine.ts#L9)):
  - Manages page drafts, block reordering, version histories, and publication state transitions (`DRAFT -> PUBLISHED`).

---

## 4. Storefront Rendering Pipeline

- **Server-Side Renderer** ([CmsStorefrontRenderer](file:///d:/SynoCommerce/src/modules/cms/renderer.ts#L15)):
  - Compiles published JSON block trees into optimized Server Component HTML strings for Next.js App Router storefronts.
