// src/database/prismaMiddleware.ts
/**
 * Prisma middleware handling:
 *  - createdAt, updatedAt timestamps
 *  - soft delete (deletedAt, deletedBy)
 *  - optimistic concurrency via `version` field
 *  - tenant scoping (tenantId from request context)
 *  - audit fields (createdBy, updatedBy)
 *  - logging of operation duration & warning on slow queries
 *  - mapping Prisma errors to custom error hierarchy
 */
import { Prisma } from '@prisma/client';
import { getContext } from '../context/requestContext';
import { logger } from '../common/logger';
import {
  DatabaseError,
  NotFoundError,
  DuplicateError,
  ValidationError,
  ConcurrencyError,
  TransactionError,
} from '../common/errors';

const SLOW_QUERY_THRESHOLD_MS = 500; // could be moved to constants

/**
 * Map Prisma error codes to custom errors.
 */
function mapPrismaError(error: any): Error {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2025':
        return new NotFoundError(error.message);
      case 'P2002':
        return new DuplicateError(error.message);
      case 'P2003':
        return new ValidationError(error.message);
      case 'P2023':
        return new ConcurrencyError(error.message);
      case 'P2000':
        return new ValidationError(error.message);
      default:
        return new DatabaseError(error.message);
    }
  }
  return error;
}

export const prismaMiddleware: Prisma.Middleware = async (params, next) => {
  const start = Date.now();
  const ctx = (() => {
    try {
      return getContext();
    } catch {
      return null;
    }
  })();

  // Inject tenantId and audit fields for write actions
  if (ctx && ['create', 'createMany', 'update', 'updateMany', 'upsert', 'delete', 'deleteMany'].includes(params.action)) {
    const data = params.args?.data ?? {};
    // Ensure tenantId is always set (except for tables that are global, but we assume all are tenant scoped)
    if (typeof data === 'object' && !Array.isArray(data)) {
      if ('tenantId' in params.model?.fields?.some?.({ name: 'tenantId' })) {
        // nothing – just placeholder, actual check will be runtime when field exists
      }
      // Set tenantId if model has that field
      if (data && typeof data === 'object' && !(data as any).tenantId && (params.model as any)?.fields?.some?.((f: any) => f.name === 'tenantId')) {
        (data as any).tenantId = ctx.tenantId;
      }
      // Audit fields
      if (params.action.startsWith('create')) {
        (data as any).createdAt = new Date();
        (data as any).createdBy = ctx.userId;
      }
      if (params.action.startsWith('update')) {
        (data as any).updatedAt = new Date();
        (data as any).updatedBy = ctx.userId;
      }
      // For soft delete, we intercept delete actions later
    }
    params.args = { ...params.args, data };
  }

  // Soft delete handling – convert delete actions into update setting deletedAt/deletedBy
  if (ctx && (params.action === 'delete' || params.action === 'deleteMany')) {
    // Convert to update; keep original where clause
    const where = params.args?.where;
    const data: any = { deletedAt: new Date(), deletedBy: ctx.userId };
    if (params.action === 'delete') {
      params.action = 'update';
      params.args = { where, data };
    } else if (params.action === 'deleteMany') {
      params.action = 'updateMany';
      params.args = { where, data };
    }
  }

  // Optimistic concurrency – increment version if field exists
  if (ctx && params.action.startsWith('update')) {
    const data = params.args?.data;
    if (data && typeof data === 'object' && !(data as any).version && (params.model as any)?.fields?.some?.((f: any) => f.name === 'version')) {
      (data as any).version = { increment: 1 };
    }
  }

  try {
    const result = await next(params);
    const duration = Date.now() - start;
    if (duration > SLOW_QUERY_THRESHOLD_MS) {
      logger.warn({ model: params.model, action: params.action, duration, requestId: ctx?.requestId }, 'Slow query detected');
    } else {
      logger.info({ model: params.model, action: params.action, duration, requestId: ctx?.requestId }, 'DB operation');
    }
    return result;
  } catch (err) {
    const mapped = mapPrismaError(err);
    logger.error({ error: mapped, model: params.model, action: params.action, requestId: ctx?.requestId }, 'Prisma error');
    throw mapped;
  }
};
