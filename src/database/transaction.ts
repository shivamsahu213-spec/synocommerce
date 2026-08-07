// src/database/transaction.ts
/**
 * Helper to execute a series of database operations within a transaction.
 * Guarantees that any thrown error rolls back the transaction.
 */
import { prisma } from './prisma';
import { TransactionError } from '../common/errors';
import { logger } from '../common/logger';

export async function withTransaction<T>(fn: (tx: any) => Promise<T>): Promise<T> {
  try {
    return await (prisma as any).$transaction(async (tx: any) => {
      return await fn(tx);
    });
  } catch (error) {
    logger.error({ error }, 'Transaction failed');
    throw new TransactionError('Transaction failed');
  }
}
