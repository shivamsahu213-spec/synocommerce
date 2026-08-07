import { Request, Response, NextFunction } from 'express';
import { refundService, RefundService } from '../services/refund.service';
import { refundRequestSchema, refundApproveSchema } from '../dto/refund.dto';
import { AuthenticatedRequest } from '../../auth/middleware/authenticate';
import { ApiResponse } from '../../../common/response';

export class RefundController {
  constructor(private service: RefundService = refundService) {}

  private getTenantId(req: Request): string {
    return (req.headers['x-tenant-id'] as string) || (req as any).user?.tenantId || 'default-store';
  }

  requestRefund = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = refundRequestSchema.parse(req.body);
      const tenantId = this.getTenantId(req);

      const refund = await this.service.requestRefund(tenantId, dto);

      const response: ApiResponse = {
        success: true,
        data: refund,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  approveRefund = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = refundApproveSchema.parse({
        refundId: req.params.id || req.body.refundId,
        approvalStatus: req.body.approvalStatus,
        approvedBy: req.user?.userId,
      });
      const tenantId = this.getTenantId(req);

      const updated = await this.service.processRefundApproval(tenantId, dto);

      const response: ApiResponse = {
        success: true,
        data: updated,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getRefundsForOrder = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tenantId = this.getTenantId(req);
      const orderId = req.params.orderId as string;

      const refunds = await this.service.getRefundsForOrder(orderId, tenantId);

      const response: ApiResponse = {
        success: true,
        data: refunds,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const refundController = new RefundController();
