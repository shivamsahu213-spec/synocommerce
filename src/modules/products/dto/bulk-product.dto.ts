import { z } from 'zod';
import { createProductSchema } from './create-product.dto';
import { updateProductSchema } from './update-product.dto';

export const bulkProductActionSchema = z.object({
  action: z.enum(['CREATE', 'UPDATE', 'DELETE', 'PUBLISH', 'ARCHIVE']),
  productIds: z.array(z.string()).optional(),
  products: z.array(createProductSchema).optional(),
  updateData: updateProductSchema.optional(),
});

export type BulkProductActionDto = z.infer<typeof bulkProductActionSchema>;
