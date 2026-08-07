import { z } from 'zod';
import { ShipmentStatus } from '@prisma/client';

export const shipmentEventSchema = z.object({
  status: z.string(),
  location: z.string().optional(),
  description: z.string().optional(),
  timestamp: z.string().optional(),
});

export const updateShipmentSchema = z.object({
  carrier: z.string().optional(),
  trackingNumber: z.string().optional(),
  labelUrl: z.string().optional(),
  status: z.nativeEnum(ShipmentStatus).optional(),
  estimatedDelivery: z.string().datetime({ offset: true }).or(z.date()).optional(),
  events: z.array(shipmentEventSchema).optional(),
});

export type UpdateShipmentDto = z.infer<typeof updateShipmentSchema>;
