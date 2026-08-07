// src/server/config/appConfig.ts
import { getEnv } from './envLoader';

export const appConfig = {
  port: Number(getEnv('PORT', false) || 3000),
  version: '1.0.0',
  nodeEnv: getEnv('NODE_ENV', false) || 'development',
  jwtSecret: getEnv('JWT_SECRET', true),
  jwtExpiresIn: getEnv('JWT_EXPIRES_IN', false) || '1h',
  bcryptSaltRounds: Number(getEnv('BCRYPT_SALT_ROUNDS', false) || 10),
  redisUrl: getEnv('REDIS_URL', false) || 'redis://localhost:6379',
  databaseUrl: getEnv('DATABASE_URL', true),
};


