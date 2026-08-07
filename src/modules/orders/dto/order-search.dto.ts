import { z } from 'zod';
import { OrderStatus, PaymentStatus, ShipmentStatus } from '@prisma/client';

export const orderSearchSchema = z.object({
  q: z.string().optional(),
  status: z.nativeEnum(OrderStatus).optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  shipmentStatus: z.nativeEnum(ShipmentStatus).optional(),
  customerEmail: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  minTotal: z.preprocess((val) => (val !== undefined ? Number(val) : undefined), z.number().optional()),
  maxTotal: z.preprocess((val) => (val !== undefined ? Number(val) : undefined), z.number().optional()),
  page: z.preprocess((val) => (val !== undefined ? Number(val) : 1), z.number().int().positive().optional().default(1)),
  limit: z.preprocess((val) => (val !== undefined ? Number(val) : 20), z.number().int().positive().max(100).optional().default(20)),
  cursor: z.string().optional(),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type OrderSearchDto = z.infer<typeof orderSearchSchema>;
