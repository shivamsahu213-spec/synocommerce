// src/common/logger.ts
/**
 * Centralised Pino logger configuration.
 * In development we use a pretty transport, otherwise JSON output.
 */
import pino from 'pino';

const isDev = process.env.NODE_ENV !== 'production';

let transport;
if (isDev) {
  try {
    transport = pino.transport({ target: 'pino-pretty', options: { colorize: true, translateTime: true } });
  } catch {
    transport = undefined;
  }
}

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport,
);
