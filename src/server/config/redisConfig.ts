// src/server/config/redisConfig.ts
import { Redis } from 'ioredis';
import { getEnv } from './envLoader';

export const redis = new Redis(getEnv('REDIS_URL'), {
  lazyConnect: true,
  enableOfflineQueue: false,
  maxRetriesPerRequest: 0,
});

redis.on('error', () => {
  // Silent error handler when Redis server is offline
});
