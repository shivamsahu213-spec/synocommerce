/**
 * Delivery Response Wrappers
 * @module delivery/responses
 */

export interface ApiResponse<TData> {
  readonly success: true;
  readonly data: TData;
  readonly meta?: Record<string, unknown> | undefined;
}

export interface ApiPaginatedResponse<TData> {
  readonly success: true;
  readonly items: readonly TData[];
  readonly pagination: {
    readonly page: number;
    readonly limit: number;
    readonly totalItems: number;
    readonly totalPages: number;
    readonly hasNext: boolean;
    readonly hasPrevious: boolean;
  };
}

export interface ApiCursorPaginatedResponse<TData> {
  readonly success: true;
  readonly items: readonly TData[];
  readonly cursor: {
    readonly nextCursor?: string | undefined;
    readonly previousCursor?: string | undefined;
    readonly hasNext: boolean;
    readonly hasPrevious: boolean;
  };
}

export interface ApiProblemDetailsResponse {
  readonly success: false;
  readonly type: string;
  readonly title: string;
  readonly status: number;
  readonly detail: string;
  readonly instance: string;
  readonly invalidParams?: readonly { name: string; reason: string }[] | undefined;
}
