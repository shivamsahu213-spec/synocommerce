import { Request, Response, NextFunction } from 'express';
import { orderService, OrderService } from '../services/order.service';
import { createOrderSchema } from '../dto/create-order.dto';
import { updateOrderSchema } from '../dto/update-order.dto';
import { orderSearchSchema } from '../dto/order-search.dto';
import { AuthenticatedRequest } from '../../auth/middleware/authenticate';
import { ApiResponse } from '../../../common/response';

export class OrderController {
  constructor(private service: OrderService = orderService) {}

  private getTenantId(req: Request): string {
    return (req.headers['x-tenant-id'] as string) || (req as any).user?.tenantId || 'default-store';
  }

  private getStoreId(req: Request): string {
    return (req.headers['x-store-id'] as string) || 'default-store';
  }

  createOrder = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = createOrderSchema.parse(req.body);
      const tenantId = this.getTenantId(req);
      const storeId = this.getStoreId(req);
      const actorId = req.user?.userId;

      const order = await this.service.createOrder(tenantId, storeId, dto, actorId);

      const response: ApiResponse = {
        success: true,
        data: order,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  getOrderById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tenantId = this.getTenantId(req);
      const id = req.params.id as string;
      const order = await this.service.getOrderById(id, tenantId);

      const response: ApiResponse = {
        success: true,
        data: order,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  updateOrder = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = updateOrderSchema.parse(req.body);
      const tenantId = this.getTenantId(req);
      const id = req.params.id as string;
      const actorId = req.user?.userId;

      const updated = await this.service.updateOrder(id, tenantId, dto, actorId);

      const response: ApiResponse = {
        success: true,
        data: updated,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  deleteOrder = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tenantId = this.getTenantId(req);
      const id = req.params.id as string;
      const actorId = req.user?.userId;

      await this.service.softDeleteOrder(id, tenantId, actorId);

      const response: ApiResponse = {
        success: true,
        data: { message: `Order '${id}' deleted successfully` },
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  searchOrders = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = orderSearchSchema.parse(req.query);
      const tenantId = this.getTenantId(req);

      const result = await this.service.searchOrders(tenantId, dto);

      const response: ApiResponse = {
        success: true,
        data: result.items,
        meta: result.meta,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  // Customer endpoints
  getMyOrders = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tenantId = this.getTenantId(req);
      const customerId = req.user?.userId;
      if (!customerId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } });
        return;
      }

      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 20;

      const result = await this.service.getMyOrders(tenantId, customerId, page, limit);

      const response: ApiResponse = {
        success: true,
        data: result.items,
        meta: result.meta,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getMyOrderById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tenantId = this.getTenantId(req);
      const customerId = req.user?.userId;
      const id = req.params.id as string;

      if (!customerId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } });
        return;
      }

      const order = await this.service.getMyOrderById(id, tenantId, customerId);

      const response: ApiResponse = {
        success: true,
        data: order,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  cancelMyOrder = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tenantId = this.getTenantId(req);
      const customerId = req.user?.userId;
      const id = req.params.id as string;
      const reason = req.body?.reason;

      if (!customerId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } });
        return;
      }

      const order = await this.service.cancelMyOrder(id, tenantId, customerId, reason);

      const response: ApiResponse = {
        success: true,
        data: order,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  returnMyOrder = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tenantId = this.getTenantId(req);
      const customerId = req.user?.userId;
      const id = req.params.id as string;
      const reason = req.body?.reason || 'Return requested by customer';

      if (!customerId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } });
        return;
      }

      const order = await this.service.returnMyOrder(id, tenantId, customerId, reason);

      const response: ApiResponse = {
        success: true,
        data: order,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  // Admin endpoints
  approveOrder = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tenantId = this.getTenantId(req);
      const id = req.params.id as string;
      const actorId = req.user?.userId || '';

      const order = await this.service.approveOrder(id, tenantId, actorId);

      const response: ApiResponse = {
        success: true,
        data: order,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  shipOrder = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tenantId = this.getTenantId(req);
      const id = req.params.id as string;
      const actorId = req.user?.userId || '';

      const order = await this.service.shipOrder(id, tenantId, actorId);

      const response: ApiResponse = {
        success: true,
        data: order,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  deliverOrder = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tenantId = this.getTenantId(req);
      const id = req.params.id as string;
      const actorId = req.user?.userId || '';

      const order = await this.service.deliverOrder(id, tenantId, actorId);

      const response: ApiResponse = {
        success: true,
        data: order,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  refundOrder = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tenantId = this.getTenantId(req);
      const id = req.params.id as string;
      const actorId = req.user?.userId || '';

      const order = await this.service.refundOrder(id, tenantId, actorId);

      const response: ApiResponse = {
        success: true,
        data: order,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const orderController = new OrderController();
