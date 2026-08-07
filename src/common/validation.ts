// src/common/validation.ts
/**
 * Zod validation schemas shared across the backend.
 * All API input should be validated against these schemas before reaching
 * service or repository layers.
 */
import { z } from 'zod';
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, DEFAULT_CURSOR_LIMIT } from './constants';

// UUID validation – Prisma uses UUID strings for many IDs.
export const uuidSchema = z.string().uuid({ message: 'Invalid UUID format' });

// Generic numeric ID (positive integer)
export const idSchema = z.number().int().positive({ message: 'ID must be a positive integer' });

// Pagination schema – offset based
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(MAX_PAGE_SIZE)
    .default(DEFAULT_PAGE_SIZE),
});

// Cursor based pagination schema
export const cursorPaginationSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(DEFAULT_CURSOR_LIMIT)
    .default(DEFAULT_PAGE_SIZE),
});

// Sorting – comma separated list of "field direction"
export const sortSchema = z
  .string()
  .refine((val) => {
    if (!val) return true;
    return val
      .split(',')
      .every((segment) => /^\s*\w+(\.\w+)*(\s+(asc|desc))?\s*$/i.test(segment.trim()));
  }, { message: 'Invalid sort format' })
  .optional();

// Generic filter payload – loosely typed; each key maps to a value or condition object.
export const filterSchema = z.record(z.string(), z.any()).optional();

// Example: payload for creating a resource – extend per model as needed.
// export const createUserSchema = z.object({
//   email: z.string().email(),
//   name: z.string().min(1),
//   // ...other fields
// });

export const validationSchemas = {
  uuidSchema,
  idSchema,
  paginationSchema,
  cursorPaginationSchema,
  sortSchema,
  filterSchema,
};

export type ValidationSchemas = typeof validationSchemas;
