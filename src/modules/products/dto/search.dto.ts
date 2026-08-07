import { z } from 'zod';

export const productSearchQuerySchema = z.object({
  q: z.string().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  brandId: z.string().optional(),
  brand: z.string().optional(),
  categoryId: z.string().optional(),
  category: z.string().optional(),
  collectionId: z.string().optional(),
  collection: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  status: z.enum(['DRAFT', 'ACTIVE', 'ARCHIVED', 'SCHEDULED']).optional(),
  isActive: z
    .preprocess((val) => (val === 'true' || val === true ? true : val === 'false' || val === false ? false : undefined), z.boolean().optional()),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  createdAfter: z.string().optional(),
  createdBefore: z.string().optional(),
  updatedAfter: z.string().optional(),
  updatedBefore: z.string().optional(),
  sortBy: z.enum(['name', 'price', 'createdAt', 'updatedAt', 'sku']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  cursor: z.string().optional(),
});

export type ProductSearchQueryDto = z.infer<typeof productSearchQuerySchema>;
