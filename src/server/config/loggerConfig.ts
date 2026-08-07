// src/server/config/loggerConfig.ts
import pino from 'pino';
import { appConfig } from './appConfig';

export const logger = pino({
  name: 'synocommerce-backend',
  level: appConfig.nodeEnv === 'production' ? 'info' : 'debug',
  transport: appConfig.nodeEnv !== 'production' ? { target: 'pino-pretty' } : undefined,
});
