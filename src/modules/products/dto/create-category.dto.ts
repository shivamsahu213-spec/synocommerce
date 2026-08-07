import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  slug: z.string().min(1, 'Category slug is required'),
  description: z.string().optional(),
  parentId: z.string().nullable().optional(),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
