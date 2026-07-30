/**
 * Delivery Layer Constants
 * @module delivery/constants
 */

export const DEFAULT_API_VERSION = 'v1';
export const SUPPORTED_API_VERSIONS = ['v1', 'v2'] as const;

export const DELIVERY_HEADERS = {
  CORRELATION_ID: 'x-correlation-id',
  TENANT_ID: 'x-tenant-id',
  API_VERSION: 'x-api-version',
  IDEMPOTENCY_KEY: 'idempotency-key',
  RATE_LIMIT_LIMIT: 'x-ratelimit-limit',
  RATE_LIMIT_REMAINING: 'x-ratelimit-remaining',
  RATE_LIMIT_RESET: 'x-ratelimit-reset',
} as const;

export const DEFAULT_PAGE_LIMIT = 20;
export const MAX_PAGE_LIMIT = 100;
