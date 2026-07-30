/**
 * Shared Domain Types
 * @module domain/shared-domain/types
 */

export type WeightUnit = 'kg' | 'g' | 'lb' | 'oz';
export type LengthUnit = 'cm' | 'm' | 'mm' | 'in' | 'ft';

export interface KeyValuePair<TValue = unknown> {
  readonly key: string;
  readonly value: TValue;
}

export type SortDirection = 'asc' | 'desc';

export interface PaginationParams {
  readonly page: number;
  readonly limit: number;
}

export interface PaginatedResult<TItem> {
  readonly items: readonly TItem[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
