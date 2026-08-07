import { Request, Response, NextFunction } from 'express';
import { invoiceService, InvoiceService } from '../services/invoice.service';
import { AuthenticatedRequest } from '../../auth/middleware/authenticate';
import { ApiResponse } from '../../../common/response';

export class InvoiceController {
  constructor(private service: InvoiceService = invoiceService) {}

  private getTenantId(req: Request): string {
    return (req.headers['x-tenant-id'] as string) || (req as any).user?.tenantId || 'default-store';
  }

  getInvoiceByOrderId = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tenantId = this.getTenantId(req);
      const orderId = req.params.orderId as string;

      const invoice = await this.service.generateInvoice(orderId, tenantId);

      const response: ApiResponse = {
        success: true,
        data: invoice,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const invoiceController = new InvoiceController();
