// src/utils/health.ts
/**
 * Simple health‑check utilities for PostgreSQL and Redis.
 * Returns an object indicating the status of each dependency.
 */
import { prisma } from '../database/prisma';
import { logger } from '../common/logger';

export async function checkPostgres() {
  try {
    await prisma.$executeRaw`SELECT 1`;
    return { ok: true };
  } catch (err) {
    logger.error({ error: err }, 'Postgres health check failed');
    return { ok: false, error: err };
  }
}

// Redis client placeholder – user can replace with actual ioredis or redis client.
const redisClient = (globalThis as any).redisClient || null;
export async function checkRedis() {
  if (!redisClient) {
    logger.warn({ }, 'Redis client not configured – skipping health check');
    return { ok: false, error: 'Redis client not initialized' };
  }
  try {
    const pong = await redisClient.ping();
    return { ok: pong === 'PONG' };
  } catch (err) {
    logger.error({ error: err }, 'Redis health check failed');
    return { ok: false, error: err };
  }
}

export async function healthCheck() {
  const pg = await checkPostgres();
  const rd = await checkRedis();
  return { postgres: pg, redis: rd };
}
