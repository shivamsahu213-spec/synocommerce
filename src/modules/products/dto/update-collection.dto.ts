import { z } from 'zod';
import { createCollectionSchema } from './create-collection.dto';

export const updateCollectionSchema = createCollectionSchema.partial();

export type UpdateCollectionDto = z.infer<typeof updateCollectionSchema>;
