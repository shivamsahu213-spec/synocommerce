// src/server/config/dbConfig.ts
import { PrismaClient } from '@prisma/client';

// Export a singleton Prisma client
export const prisma = new PrismaClient();
