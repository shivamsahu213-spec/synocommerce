import { z } from 'zod';
import { RefundType, RefundApprovalStatus } from '@prisma/client';

export const refundRequestSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  amount: z.number().positive('Refund amount must be positive').optional(),
  type: z.nativeEnum(RefundType).optional().default(RefundType.FULL),
  reason: z.string().min(1, 'Reason for refund is required'),
});

export const refundApproveSchema = z.object({
  refundId: z.string().min(1, 'Refund ID is required'),
  approvalStatus: z.nativeEnum(RefundApprovalStatus),
  approvedBy: z.string().optional(),
});

export type RefundRequestDto = z.infer<typeof refundRequestSchema>;
export type RefundApproveDto = z.infer<typeof refundApproveSchema>;
