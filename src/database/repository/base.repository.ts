// src/database/repository/base.repository.ts
/**
 * Generic BaseRepository implementing IRepository using Prisma.
 * All concrete repositories will extend this class and only provide the model name.
 */
import { prisma } from '../prisma';
import { IRepository } from './repository.interface';
import { PaginationMeta, CursorMeta } from '../../common/response';
import { OrderBy } from '../sorting';
import { FilterGroup } from '../../database/filters';
import { buildWhere } from '../../database/utils/queryBuilder';
import { logger } from '../../common/logger';
import {
  DatabaseError,
  NotFoundError,
  DuplicateError,
  ValidationError,
  ConcurrencyError,
  TransactionError,
} from '../../common/errors';

export abstract class BaseRepository<T> implements IRepository<T> {
  protected abstract model: keyof typeof prisma;

  protected get client() {
    return prisma;
  }

  async findById(id: string, includeDeleted = false): Promise<T | null> {
    try {
      const where: any = { id };
      if (!includeDeleted) where.deletedAt = null;
      return (await (this.client[this.model] as any).findUnique({ where })) as T | null;
    } catch (e) {
      logger.error({ error: e, model: this.model, id }, 'findById error');
      throw e;
    }
  }

  async findFirst(where: any = {}, includeDeleted = false): Promise<T | null> {
    try {
      const finalWhere = { ...where, ...(includeDeleted ? {} : { deletedAt: null }) };
      return (await (this.client[this.model] as any).findFirst({ where: finalWhere })) as T | null;
    } catch (e) {
      logger.error({ error: e, model: this.model }, 'findFirst error');
      throw e;
    }
  }

  async findMany(params: any = {}): Promise<T[]> {
    try {
      const { where = {}, orderBy, skip, take, includeDeleted = false } = params;
      const finalWhere = { ...where, ...(includeDeleted ? {} : { deletedAt: null }) };
      return (await (this.client[this.model] as any).findMany({
        where: finalWhere,
        orderBy,
        skip,
        take,
      })) as T[];
    } catch (e) {
      logger.error({ error: e, model: this.model, params }, 'findMany error');
      throw e;
    }
  }

  async create(data: any): Promise<T> {
    try {
      return (await (this.client[this.model] as any).create({ data })) as T;
    } catch (e) {
      logger.error({ error: e, model: this.model, data }, 'create error');
      throw e;
    }
  }

  async createMany(data: any[]): Promise<T[]> {
    try {
      return (await (this.client[this.model] as any).createMany({ data, skipDuplicates: true })) as unknown as T[];
    } catch (e) {
      logger.error({ error: e, model: this.model }, 'createMany error');
      throw e;
    }
  }

  async update(id: string, data: any): Promise<T> {
    try {
      return (await (this.client[this.model] as any).update({ where: { id }, data })) as T;
    } catch (e) {
      logger.error({ error: e, model: this.model, id, data }, 'update error');
      throw e;
    }
  }

  async updateMany(where: any, data: any): Promise<number> {
    try {
      const result = await (this.client[this.model] as any).updateMany({ where, data });
      return result.count as number;
    } catch (e) {
      logger.error({ error: e, model: this.model, where, data }, 'updateMany error');
      throw e;
    }
  }

  async delete(id: string, deletedBy?: string): Promise<T> {
    // Soft delete – actual logic handled by Prisma middleware.
    try {
      return (await (this.client[this.model] as any).delete({ where: { id } })) as T;
    } catch (e) {
      logger.error({ error: e, model: this.model, id }, 'delete error');
      throw e;
    }
  }

  async restore(id: string): Promise<T> {
    try {
      return (await (this.client[this.model] as any).update({
        where: { id },
        data: { deletedAt: null, deletedBy: null },
      })) as T;
    } catch (e) {
      logger.error({ error: e, model: this.model, id }, 'restore error');
      throw e;
    }
  }

  async hardDelete(id: string): Promise<void> {
    // Delegates to hardDelete helper that bypasses middleware.
    const { hardDelete } = await import('../softDelete');
    await hardDelete(this.model, { id });
  }

  async count(where: any = {}, includeDeleted = false): Promise<number> {
    const finalWhere = { ...where, ...(includeDeleted ? {} : { deletedAt: null }) };
    return (await (this.client[this.model] as any).count({ where: finalWhere })) as number;
  }

  async exists(where: any = {}, includeDeleted = false): Promise<boolean> {
    const cnt = await this.count(where, includeDeleted);
    return cnt > 0;
  }

  async paginate(params: any): Promise<{ items: T[]; meta: PaginationMeta }> {
    const { page = 1, pageSize = 20, where = {}, orderBy, includeDeleted = false } = params;
    const { items, meta } = await import('../pagination').then((m) =>
      m.paginate<T>(this.model, { where, orderBy }, page, pageSize),
    );
    return { items, meta };
  }

  async paginateCursor(params: any): Promise<{ items: T[]; meta: CursorMeta }> {
    const { cursor, take, where = {}, orderBy } = params;
    const result = await import('../pagination').then((m) =>
      m.paginateCursor<T>(this.model, { where, orderBy }, { cursor, take }),
    );
    const meta: CursorMeta = {};
    if (result.nextCursor) meta.nextCursor = result.nextCursor;
    if (result.previousCursor) meta.previousCursor = result.previousCursor;
    return { items: result.items, meta };
  }

  async filter(filter: FilterGroup, options: any = {}): Promise<T[]> {
    const where = buildWhere(filter);
    const { orderBy, includeDeleted = false } = options;
    return this.findMany({ where, orderBy, includeDeleted });
  }
}
