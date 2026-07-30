/**
 * Application Response Wrappers
 * @module application/responses
 */

export interface SingleResponse<T> {
  readonly data: T;
  readonly metadata?: Record<string, unknown> | undefined;
}

export interface PaginatedResponse<T> {
  readonly items: readonly T[];
  readonly totalItems: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

export interface BatchResponse<T> {
  readonly items: readonly T[];
  readonly successCount: number;
  readonly failureCount: number;
}
