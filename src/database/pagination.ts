// src/database/pagination.ts
/**
 * Helper utilities for offset and cursor based pagination.
 */
import { prisma } from './prisma';
import { PaginationMeta } from '../common/response';
import { logger } from '../common/logger';

/**
 * Simple offset pagination.
 * Returns items and meta information.
 */
export async function paginate<T>(
  model: keyof typeof prisma,
  args: any,
  page: number = 1,
  pageSize: number = 20,
): Promise<{ items: T[]; meta: PaginationMeta }> {
  const skip = (page - 1) * pageSize;
  const total = await (prisma[model] as any).count({ where: args.where ?? {} });
  const items = await (prisma[model] as any).findMany({ ...args, skip, take: pageSize });
  const totalPages = Math.ceil(total / pageSize);
  const meta: PaginationMeta = { total, page, pageSize, totalPages };
  logger.debug({ model, page, pageSize, total }, 'Paginated query');
  return { items, meta };
}

/**
 * Cursor based pagination – works with composite cursors encoded as base64 JSON.
 */
export interface CursorParams {
  cursor?: string; // base64 encoded { id: string, ... }
  take: number; // positive for forward, negative for backward
}

export async function paginateCursor<T>(
  model: keyof typeof prisma,
  args: any,
  params: CursorParams,
): Promise<{ items: T[]; nextCursor?: string; previousCursor?: string }> {
  const { cursor, take } = params;
  let decodedCursor: any = undefined;
  if (cursor) {
    try {
      const json = Buffer.from(cursor, 'base64').toString('utf-8');
      decodedCursor = JSON.parse(json);
    } catch (e) {
      logger.warn({ cursor }, 'Invalid cursor');
    }
  }

  const queryArgs = { ...args, cursor: decodedCursor ? { id: decodedCursor.id } : undefined, take };
  const items = await (prisma[model] as any).findMany(queryArgs);

  const nextCursor = items.length === Math.abs(take) ? Buffer.from(JSON.stringify({ id: (items[items.length - 1] as any).id })).toString('base64') : undefined;
  const previousCursor = decodedCursor ? Buffer.from(JSON.stringify({ id: (items[0] as any).id })).toString('base64') : undefined;

  const result: { items: T[]; nextCursor?: string; previousCursor?: string } = { items };
  if (nextCursor) result.nextCursor = nextCursor;
  if (previousCursor) result.previousCursor = previousCursor;

  return result;
}
