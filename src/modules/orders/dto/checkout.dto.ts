import { z } from 'zod';

export const checkoutItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  variantId: z.string().optional(),
  quantity: z.number().int().positive('Quantity must be greater than 0'),
});

export const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().optional(),
  region: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
});

export const checkoutSchema = z.object({
  items: z.array(checkoutItemSchema).min(1, 'At least one item is required'),
  couponCode: z.string().optional(),
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional(),
  currency: z.string().optional().default('USD'),
  customerEmail: z.string().email('Invalid email address').optional(),
  customerPhone: z.string().optional(),
});

export type CheckoutDto = z.infer<typeof checkoutSchema>;
export type CheckoutItemDto = z.infer<typeof checkoutItemSchema>;
export type AddressDto = z.infer<typeof addressSchema>;
