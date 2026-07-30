/**
 * Delivery Layer Types
 * @module delivery/types
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

export interface PaginationOptions {
  readonly page: number;
  readonly limit: number;
}

export interface CursorPaginationOptions {
  readonly cursor?: string | undefined;
  readonly limit: number;
  readonly direction?: 'forward' | 'backward' | undefined;
}

export interface SortOption {
  readonly field: string;
  readonly direction: 'asc' | 'desc';
}

export interface FilterOption {
  readonly field: string;
  readonly operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'contains';
  readonly value: unknown;
}
