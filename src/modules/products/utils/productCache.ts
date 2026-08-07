import { redis } from '../../../server/config/redisConfig';
import { logger } from '../../../common/logger';

class ProductCache {
  private memoryCache = new Map<string, { value: string; expiresAt: number }>();
  private defaultTTL = 300; // 5 minutes

  async get<T>(key: string): Promise<T | null> {
    try {
      if (redis.status === 'ready' || redis.status === 'connecting') {
        const cached = await redis.get(key);
        if (cached) return JSON.parse(cached) as T;
      }
    } catch {
      // Fallback to memory
    }

    const mem = this.memoryCache.get(key);
    if (mem && mem.expiresAt > Date.now()) {
      return JSON.parse(mem.value) as T;
    }
    return null;
  }

  async set<T>(key: string, value: T, ttlSeconds = this.defaultTTL): Promise<void> {
    const stringified = JSON.stringify(value);
    try {
      if (redis.status === 'ready' || redis.status === 'connecting') {
        await redis.setex(key, ttlSeconds, stringified);
      }
    } catch {
      // Fallback to memory
    }
    this.memoryCache.set(key, {
      value: stringified,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  async del(pattern: string): Promise<void> {
    try {
      if (redis.status === 'ready') {
        const keys = await redis.keys(`*${pattern}*`);
        if (keys.length > 0) {
          await redis.del(...keys);
        }
      }
    } catch (err) {
      logger.warn({ err }, 'Redis clear cache warning');
    }

    for (const key of this.memoryCache.keys()) {
      if (key.includes(pattern)) {
        this.memoryCache.delete(key);
      }
    }
  }

  async invalidateProductCatalog(storeId: string): Promise<void> {
    await this.del(`product:${storeId}`);
    await this.del(`category:${storeId}`);
    await this.del(`brand:${storeId}`);
    await this.del(`collection:${storeId}`);
    await this.del(`search:${storeId}`);
  }
}

export const productCache = new ProductCache();
