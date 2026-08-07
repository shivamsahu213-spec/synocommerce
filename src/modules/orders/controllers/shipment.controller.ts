import { Request, Response, NextFunction } from 'express';
import { shipmentService, ShipmentService } from '../services/shipment.service';
import { createShipmentSchema } from '../dto/create-shipment.dto';
import { updateShipmentSchema } from '../dto/update-shipment.dto';
import { AuthenticatedRequest } from '../../auth/middleware/authenticate';
import { ApiResponse } from '../../../common/response';

export class ShipmentController {
  constructor(private service: ShipmentService = shipmentService) {}

  private getTenantId(req: Request): string {
    return (req.headers['x-tenant-id'] as string) || (req as any).user?.tenantId || 'default-store';
  }

  createShipment = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = createShipmentSchema.parse(req.body);
      const tenantId = this.getTenantId(req);

      const shipment = await this.service.createShipment(tenantId, dto);

      const response: ApiResponse = {
        success: true,
        data: shipment,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  updateShipment = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = updateShipmentSchema.parse(req.body);
      const tenantId = this.getTenantId(req);
      const id = req.params.id as string;

      const updated = await this.service.updateShipment(id, tenantId, dto);

      const response: ApiResponse = {
        success: true,
        data: updated,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getShipmentById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tenantId = this.getTenantId(req);
      const id = req.params.id as string;

      const shipment = await this.service.getShipmentById(id, tenantId);

      const response: ApiResponse = {
        success: true,
        data: shipment,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const shipmentController = new ShipmentController();
