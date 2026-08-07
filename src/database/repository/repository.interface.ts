// src/database/repository/repository.interface.ts
/**
 * Generic repository interface that defines the contract for all concrete repositories.
 * Business logic must never be placed here – only data access operations.
 */
import { PaginationMeta, CursorMeta } from '../../common/response';
import { OrderBy } from '../sorting';
import { FilterGroup } from '../../database/filters';

export interface IRepository<T> {
  // Basic CRUD
  findById(id: string, includeDeleted?: boolean): Promise<T | null>;
  findFirst(where?: any, includeDeleted?: boolean): Promise<T | null>;
  findMany(params?: {
    where?: any;
    orderBy?: OrderBy[];
    skip?: number;
    take?: number;
    includeDeleted?: boolean;
  }): Promise<T[]>;

  // Creation
  create(data: any): Promise<T>;
  createMany(data: any[]): Promise<T[]>;

  // Update
  update(id: string, data: any): Promise<T>;
  updateMany(where: any, data: any): Promise<number>; // returns count

  // Deletion (soft)
  delete(id: string, deletedBy?: string): Promise<T>;
  restore(id: string): Promise<T>;
  hardDelete(id: string): Promise<void>;

  // Counting & existence checks
  count(where?: any, includeDeleted?: boolean): Promise<number>;
  exists(where?: any, includeDeleted?: boolean): Promise<boolean>;

  // Pagination helpers
  paginate(params: {
    page?: number;
    pageSize?: number;
    where?: any;
    orderBy?: OrderBy[];
    includeDeleted?: boolean;
  }): Promise<{ items: T[]; meta: PaginationMeta }>;

  paginateCursor(params: {
    cursor?: string;
    take: number;
    where?: any;
    orderBy?: OrderBy[];
    includeDeleted?: boolean;
  }): Promise<{ items: T[]; meta: CursorMeta }>;

  // Filtering convenience – accepts our generic filter builder
  filter(filter: FilterGroup, options?: { orderBy?: OrderBy[]; includeDeleted?: boolean }): Promise<T[]>;
}
