import { Request, Response, NextFunction } from 'express';
import { checkoutService, CheckoutService } from '../services/checkout.service';
import { checkoutSchema } from '../dto/checkout.dto';
import { AuthenticatedRequest } from '../../auth/middleware/authenticate';
import { ApiResponse } from '../../../common/response';

export class CheckoutController {
  constructor(private service: CheckoutService = checkoutService) {}

  checkout = async (req: Request | AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = checkoutSchema.parse(req.body);
      const tenantId = (req.headers['x-tenant-id'] as string) || (req as any).user?.tenantId || 'default-store';
      const storeId = (req.headers['x-store-id'] as string) || 'default-store';
      const customerId = (req as any).user?.userId;

      const result = await this.service.processCheckout(tenantId, storeId, dto, customerId);

      const response: ApiResponse = {
        success: true,
        data: result,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const checkoutController = new CheckoutController();
