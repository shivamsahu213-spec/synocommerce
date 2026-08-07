// src/server/config/envLoader.ts
import * as dotenv from 'dotenv';

dotenv.config();

export const getEnv = (key: string, required = true): string => {
  const value = process.env[key];
  if (required && (!value || value.trim() === '')) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value as string;
};
