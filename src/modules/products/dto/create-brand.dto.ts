import { z } from 'zod';

export const createBrandSchema = z.object({
  name: z.string().min(1, 'Brand name is required'),
  slug: z.string().min(1, 'Brand slug is required'),
  logoUrl: z.string().url('Invalid logo URL').optional(),
  description: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type CreateBrandDto = z.infer<typeof createBrandSchema>;
