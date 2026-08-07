// src/database/prisma.ts
/**
 * Prisma client singleton.
 * In development we attach the client to the global object to avoid creating multiple instances during hot reloads.
 */
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { logger } from '../common/logger';
import { prismaExtensions } from './prismaExtensions';

// Initialize a pg Pool using the pooled DATABASE_URL for runtime queries
const pool = new Pool({ connectionString: process.env.DATABASE_URL || process.env.DIRECT_URL });
const adapter = new PrismaPg(pool);

const prismaBase = new PrismaClient({ adapter });

// Attach client extensions
const prisma = prismaBase.$extends(prismaExtensions);

logger.info('Prisma client initialized');

export { prisma };
