// src/database/softDelete.ts
/**
 * Helpers for soft‑delete, restore, and hard‑delete operations.
 * Soft‑delete sets `deletedAt` and `deletedBy` fields; restore clears them.
 * Hard‑delete bypasses middleware by using a separate Prisma client instance.
 */
import { prisma } from './prisma';
import { logger } from '../common/logger';

export async function softDelete(model: keyof typeof prisma, where: any, deletedBy: string) {
  return await (prisma[model] as any).update({
    where,
    data: { deletedAt: new Date(), deletedBy },
  });
}

export async function restore(model: keyof typeof prisma, where: any) {
  return await (prisma[model] as any).update({
    where,
    data: { deletedAt: null, deletedBy: null },
  });
}

/**
 * Hard delete using a fresh client to bypass the soft‑delete middleware.
 */
export async function hardDelete(model: keyof typeof prisma, where: any) {
  const { PrismaClient } = await import('@prisma/client');
  const rawClient = new PrismaClient();
  try {
    const result = await (rawClient[model] as any).delete({ where });
    return result;
  } finally {
    await rawClient.$disconnect();
    logger.info({ model, where }, 'Hard delete performed');
  }
}
