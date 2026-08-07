// src/server/config/database.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { pino } from 'pino';
import { appConfig } from './appConfig';

export const logger = pino({
  name: 'synocommerce-backend',
  level: appConfig.nodeEnv === 'production' ? 'info' : 'debug',
});

const pool = new Pool({ connectionString: appConfig.databaseUrl });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
};
