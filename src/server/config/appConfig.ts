// src/server/config/appConfig.ts
import { getEnv } from './envLoader';

export const appConfig = {
  port: Number(getEnv('PORT', false) || 3000),
  version: '1.0.0',
  nodeEnv: getEnv('NODE_ENV', false) || 'development',
};
