// src/common/response.ts
/**
 * Standard API response envelope.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: any;
}

/**
 * Pagination metadata returned with paginated responses.
 */
export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

/**
 * Cursor based pagination response.
 */
export interface CursorMeta {
  nextCursor?: string;
  previousCursor?: string;
  totalCount?: number;
}

export interface CursorResponse<T> extends ApiResponse<T[]> {
  meta: CursorMeta;
}
