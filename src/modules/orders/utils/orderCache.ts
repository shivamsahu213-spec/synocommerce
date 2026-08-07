import { redis } from '../../../server/config/redisConfig';
import { logger } from '../../../common/logger';

const ORDER_CACHE_TTL = 3600; // 1 hour

export async function cacheOrder(orderId: string, data: any): Promise<void> {
  if (!redis) return;
  try {
    const key = `order:detail:${orderId}`;
    await redis.set(key, JSON.stringify(data), 'EX', ORDER_CACHE_TTL);
  } catch (error) {
    logger.warn({ error, orderId }, 'Failed to cache order detail in Redis');
  }
}

export async function getCachedOrder(orderId: string): Promise<any | null> {
  if (!redis) return null;
  try {
    const key = `order:detail:${orderId}`;
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    logger.warn({ error, orderId }, 'Failed to retrieve cached order from Redis');
    return null;
  }
}

export async function invalidateOrderCache(orderId: string, tenantId?: string): Promise<void> {
  if (!redis) return;
  try {
    const detailKey = `order:detail:${orderId}`;
    await redis.del(detailKey);
    if (tenantId) {
      const summaryPattern = `order:summary:${tenantId}:*`;
      const keys = await redis.keys(summaryPattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    }
  } catch (error) {
    logger.warn({ error, orderId }, 'Failed to invalidate order cache in Redis');
  }
}
