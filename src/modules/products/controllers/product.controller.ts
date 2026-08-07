import { Request, Response, NextFunction } from 'express';
import { productService } from '../services/product.service';
import { createProductSchema } from '../dto/create-product.dto';
import { updateProductSchema } from '../dto/update-product.dto';
import { productSearchQuerySchema } from '../dto/search.dto';
import { bulkProductActionSchema } from '../dto/bulk-product.dto';
import { requestContext } from '../../../context/requestContext';

export class ProductController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = createProductSchema.parse(req.body);
      const ctx = requestContext.getStore();
      const user = (req as any).user;
      const storeId = ctx?.tenantId || user?.tenantId || (req.headers['x-tenant-id'] as string) || 'default-store';
      const userId = user?.sub || user?.userId;

      const product = await productService.createProduct(storeId, userId, dto);

      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = productSearchQuerySchema.parse(req.query);
      const ctx = requestContext.getStore();
      const user = (req as any).user;
      const storeId = ctx?.tenantId || user?.tenantId || (req.headers['x-tenant-id'] as string) || 'default-store';

      const result = await productService.listProducts(storeId, query);

      res.status(200).json({
        success: true,
        data: result.items,
        meta: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: Math.ceil(result.total / result.limit),
        },
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

      const product = await productService.getProductById(id, storeId);

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const dto = updateProductSchema.parse(req.body);
      const ctx = requestContext.getStore();
      const user = (req as any).user;
      const storeId = ctx?.tenantId || user?.tenantId || (req.headers['x-tenant-id'] as string) || 'default-store';
      const userId = user?.sub || user?.userId;

      const product = await productService.updateProduct(id, storeId, userId, dto);

      res.status(200).json({
        success: true,
        data: product,
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
      const userId = user?.sub || user?.userId;

      await productService.deleteProduct(id, storeId, userId);

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async bulk(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = bulkProductActionSchema.parse(req.body);
      const ctx = requestContext.getStore();
      const user = (req as any).user;
      const storeId = ctx?.tenantId || user?.tenantId || (req.headers['x-tenant-id'] as string) || 'default-store';
      const userId = user?.sub || user?.userId;

      const result = await productService.bulkOperations(storeId, userId, dto);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController();
