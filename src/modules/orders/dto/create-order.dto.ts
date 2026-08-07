import { z } from 'zod';
import { addressSchema, checkoutItemSchema } from './checkout.dto';

export const createOrderSchema = z.object({
  storeId: z.string().optional(),
  customerId: z.string().optional(),
  customerEmail: z.string().email().optional(),
  customerPhone: z.string().optional(),
  items: z.array(checkoutItemSchema).min(1, 'At least one item is required'),
  couponCode: z.string().optional(),
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional(),
  currency: z.string().optional().default('USD'),
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>;
