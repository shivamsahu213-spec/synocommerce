// src/database/repository/repository.types.ts
/**
 * Types used by the generic repository layer.
 */
import { OrderBy } from '../sorting';
import { FilterGroup } from '../filters';
import { PaginationMeta, CursorMeta } from '../../common/response';

export interface PaginateParams {
  page?: number;
  pageSize?: number;
  where?: any;
  orderBy?: OrderBy[];
  includeDeleted?: boolean;
}

export interface PaginateCursorParams {
  cursor?: string;
  take: number; // positive forward, negative backward
  where?: any;
  orderBy?: OrderBy[];
  includeDeleted?: boolean;
}

export interface FilterParams {
  filter: FilterGroup;
  options?: {
    orderBy?: OrderBy[];
    includeDeleted?: boolean;
  };
}

export type RepositoryResult<T> = T | null;

export interface RepositoryMeta {
  pagination?: PaginationMeta;
  cursor?: CursorMeta;
}
