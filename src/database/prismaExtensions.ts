// src/database/prismaExtensions.ts
/**
 * Prisma client extensions placeholder.
 * Currently no custom model extensions are required, but this file
 * provides a central place to add them later without touching the core client.
 */
import { Prisma } from '@prisma/client';

export const prismaExtensions = Prisma.defineExtension((prisma) => ({
  // Example: you could add custom methods like prisma.$myMethod = () => {}
  // For now we simply return the client unchanged.
  ...prisma,
}));
