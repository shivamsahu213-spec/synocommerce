import { z } from 'zod';
import { ShipmentStatus } from '@prisma/client';

export const createShipmentSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  carrier: z.string().min(1, 'Carrier is required'),
  trackingNumber: z.string().optional(),
  labelUrl: z.string().optional(),
  estimatedDelivery: z.string().datetime({ offset: true }).or(z.date()).optional(),
  status: z.nativeEnum(ShipmentStatus).optional().default(ShipmentStatus.PENDING),
});

export type CreateShipmentDto = z.infer<typeof createShipmentSchema>;
