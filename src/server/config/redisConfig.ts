// src/server/config/redisConfig.ts
import { Redis } from 'ioredis';

import { getEnv } from './envLoader';

export const redis = new Redis(getEnv('REDIS_URL'));
