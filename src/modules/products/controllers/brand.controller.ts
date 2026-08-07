import { Request, Response, NextFunction } from 'express';
import { brandService } from '../services/brand.service';
import { createBrandSchema } from '../dto/create-brand.dto';
import { updateBrandSchema } from '../dto/update-brand.dto';
import { requestContext } from '../../../context/requestContext';

export class BrandController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = createBrandSchema.parse(req.body);
      const ctx = requestContext.getStore();
      const user = (req as any).user;
      const storeId = ctx?.tenantId || user?.tenantId || (req.headers['x-tenant-id'] as string) || 'default-store';

      const brand = await brandService.createBrand(storeId, dto);

      res.status(201).json({
        success: true,
        data: brand,
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const ctx = requestContext.getStore();
      const user = (req as any).user;
      const storeId = ctx?.tenantId || user?.tenantId || (req.headers['x-tenant-id'] as string) || 'default-store';

      const brands = await brandService.getBrands(storeId);

      res.status(200).json({
        success: true,
        data: brands,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const ctx = requestContext.getStore();
      const user = (req as any).user;
      const storeId = ctx?.tenantId || user?.tenantId || (req.headers['x-tenant-id'] as string) || 'default-store';

      const brand = await brandService.getBrandById(id, storeId);

      res.status(200).json({
        success: true,
        data: brand,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const dto = updateBrandSchema.parse(req.body);
      const ctx = requestContext.getStore();
      const user = (req as any).user;
      const storeId = ctx?.tenantId || user?.tenantId || (req.headers['x-tenant-id'] as string) || 'default-store';

      const brand = await brandService.updateBrand(id, storeId, dto);

      res.status(200).json({
        success: true,
        data: brand,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const ctx = requestContext.getStore();
      const user = (req as any).user;
      const storeId = ctx?.tenantId || user?.tenantId || (req.headers['x-tenant-id'] as string) || 'default-store';

      await brandService.deleteBrand(id, storeId);

      res.status(200).json({
        success: true,
        message: 'Brand deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const brandController = new BrandController();
