# SynoCommerce Deployment Guide

## Production Deployment Checklist

1. **Environment Diagnostics**:
   ```bash
   npx tsx tools/cli/index.ts doctor
   ```
2. **Typecheck Verification**:
   ```bash
   node node_modules/typescript/bin/tsc --noEmit
   ```
3. **Automated Test Execution**:
   ```bash
   npx tsx --test src/modules/iam/tests/iam.test.ts \
                  apps/admin/src/tests/admin.test.ts \
                  src/modules/commerce-engine/tests/commerce-engine.test.ts \
                  apps/storefront/src/tests/storefront.test.ts \
                  tools/cli/tests/cli.test.ts \
                  platform/operations/tests/operations.test.ts \
                  src/integrations/tests/integrations.test.ts
   ```
4. **Trigger Deployment**:
   ```bash
   npx tsx tools/cli/index.ts deploy
   ```
