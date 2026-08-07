// src/context/requestContext.ts
/**
 * Central request context using AsyncLocalStorage.
 * Stores request-scoped values that can be accessed anywhere in the backend.
 */
import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContext {
  requestId: string;
  correlationId: string;
  tenantId: string;
  userId: string;
  roles: string[];
  permissions: string[];
  locale: string;
  timezone: string;
  currency: string;
  ipAddress: string;
  userAgent: string;
  traceId?: string;
}

// The storage instance – a singleton.
export const requestContext = new AsyncLocalStorage<RequestContext>();

/**
 * Helper to run a function within a request context.
 */
export function runWithContext<T>(ctx: RequestContext, fn: () => Promise<T>): Promise<T> {
  return requestContext.run(ctx, fn);
}

/**
 * Retrieve the current request context. Throws if accessed outside of a request.
 */
export function getContext(): RequestContext {
  const store = requestContext.getStore();
  if (!store) {
    throw new Error('Request context not initialized');
  }
  return store;
}
