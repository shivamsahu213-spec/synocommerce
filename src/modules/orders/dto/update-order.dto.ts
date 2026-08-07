import { z } from 'zod';
import { OrderStatus, PaymentStatus, ShipmentStatus } from '@prisma/client';
import { addressSchema } from './checkout.dto';

export const updateOrderSchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  shipmentStatus: z.nativeEnum(ShipmentStatus).optional(),
  shippingAddress: addressSchema.optional(),
  billingAddress: addressSchema.optional(),
  cancelReason: z.string().optional(),
});

export type UpdateOrderDto = z.infer<typeof updateOrderSchema>;
