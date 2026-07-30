/**
 * Application Layer Types
 * @module application/types
 */

export interface ExecutionContext {
  readonly correlationId: string;
  readonly userId?: string | undefined;
  readonly tenantId?: string | undefined;
  readonly locale: string;
  readonly currency: string;
  readonly timestamp: Date;
  readonly roles: readonly string[];
  readonly permissions: readonly string[];
  readonly flags?: Record<string, boolean> | undefined;
}

export interface PaginationParams {
  readonly page: number;
  readonly limit: number;
}

export interface SortParams {
  readonly sortBy: string;
  readonly sortDirection: 'asc' | 'desc';
}

export interface FilterParams {
  readonly field: string;
  readonly operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'contains';
  readonly value: unknown;
}

export interface QueryOptions {
  readonly pagination?: PaginationParams | undefined;
  readonly sort?: SortParams | undefined;
  readonly filters?: readonly FilterParams[] | undefined;
}
