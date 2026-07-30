# SynoCommerce Developer Platform & CLI Architecture

## 1. Executive Summary

The **SynoCommerce Developer Platform** (`tools/`) provides an enterprise CLI and Extension SDK allowing third-party developers, agency partners, and merchants to extend SynoCommerce without modifying core framework source code.

```
                              +---------------------------------------+
                              |         SYNO CLI EXECUTABLE           |
                              |   (syno generate, doctor, deploy)     |
                              +---------------------------------------+
                                                  |
                                                  v
                              +---------------------------------------+
                              |         EXTENSION SDK & ENGINE        |
                              |  (BaseSynoPlugin, IPaymentProvider)   |
                              +---------------------------------------+
                                                  |
                                                  v
                              +---------------------------------------+
                              |       MARKETPLACE PACKAGER (.synopkg) |
                              +---------------------------------------+
```

---

## 2. CLI Commands Reference

- `syno init`: Initialize a new SynoCommerce extension workspace.
- `syno new <store-name>`: Scaffolds a new store application instance.
- `syno dev`: Starts local development servers for Admin Platform and Storefront.
- `syno build`: Runs production compilation across all workspace packages.
- `syno doctor`: Executes 4-point system diagnostics (Node.js version, TypeScript compiler, Layer Isolation, and Security Audit).
- `syno generate module|plugin|payment-provider|shipping-provider|tax-provider <name>`: Generates typed extension boilerplate code.
- `syno plugin install|remove|publish|verify <plugin-id>`: Manages commerce extensions.
- `syno store create <store-id>` & `syno tenant create <tenant-id>`: Provisions multi-store and multi-tenant instances.
- `syno deploy`: Deploys instance configurations to production clusters.

---

## 3. Extension SDK Overview

- **Plugin Extension SDK** ([BaseSynoPlugin](file:///d:/SynoCommerce/tools/sdk/plugin-sdk.ts#L18)):
  - Contract for custom plugins with lifecycle hooks (`onEnable`, `onDisable`) and permission manifests.
- **Provider SDK** ([IPaymentProvider](file:///d:/SynoCommerce/tools/sdk/provider-sdk.ts#L17)):
  - Strongly-typed contracts for custom Payment, Shipping, and Tax gateway providers.

---

## 4. Code Generation & Packaging

- **Generator Engine** ([CodeGeneratorEngine](file:///d:/SynoCommerce/tools/cli/generators/generator-engine.ts#L21)):
  - Emits TypeScript code templates adhering to clean architecture layer rules.
- **Marketplace Packager** ([PackagerEngine](file:///d:/SynoCommerce/tools/cli/packaging/packager.ts#L16)):
  - Bundles plugins into marketplace `.synopkg` archives containing SHA-256 integrity checksums.
