// src/database/utils/tenant.ts
/**
 * Helper to retrieve the current tenantId from the AsyncLocalStorage request context.
 * Returns undefined if called outside of a request scope.
 */
import { getContext } from '../../context/requestContext';

export function getCurrentTenantId(): string | undefined {
  try {
    const ctx = getContext();
    return ctx.tenantId;
  } catch {
    return undefined;
  }
}
