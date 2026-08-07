import { z } from 'zod';

export const collectionRuleSchema = z.object({
  field: z.enum(['price', 'category', 'brand', 'tag']),
  operator: z.enum(['equals', 'gt', 'gte', 'lt', 'lte', 'contains']),
  value: z.union([z.string(), z.number()]),
});

export const createCollectionSchema = z.object({
  name: z.string().min(1, 'Collection name is required'),
  slug: z.string().min(1, 'Collection slug is required'),
  description: z.string().optional(),
  type: z.enum(['MANUAL', 'SMART']).default('MANUAL'),
  rules: z.array(collectionRuleSchema).optional(),
  isActive: z.boolean().default(true),
});

export type CreateCollectionDto = z.infer<typeof createCollectionSchema>;
export type CollectionRuleDto = z.infer<typeof collectionRuleSchema>;
