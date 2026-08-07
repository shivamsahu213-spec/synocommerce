import { z } from 'zod';
import { CouponType } from '@prisma/client';

export const createCouponSchema = z.object({
  code: z.string().min(1, 'Coupon code is required').transform((val) => val.toUpperCase().trim()),
  type: z.nativeEnum(CouponType),
  value: z.number().nonnegative('Value must be non-negative'),
  minOrderAmount: z.number().nonnegative().optional(),
  buyXQuantity: z.number().int().positive().optional(),
  getYQuantity: z.number().int().positive().optional(),
  usageLimit: z.number().int().positive().optional(),
  customerEligibility: z.array(z.string()).optional(),
  expiresAt: z.string().datetime({ offset: true }).or(z.date()).optional(),
});

export const updateCouponSchema = createCouponSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export type CreateCouponDto = z.infer<typeof createCouponSchema>;
export type UpdateCouponDto = z.infer<typeof updateCouponSchema>;
