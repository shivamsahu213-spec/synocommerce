import { Request, Response, NextFunction } from 'express';
import { categoryService } from '../services/category.service';
import { createCategorySchema } from '../dto/create-category.dto';
import { updateCategorySchema } from '../dto/update-category.dto';
import { requestContext } from '../../../context/requestContext';

export class CategoryController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = createCategorySchema.parse(req.body);
      const ctx = requestContext.getStore();
      const user = (req as any).user;
      const storeId = ctx?.tenantId || user?.tenantId || (req.headers['x-tenant-id'] as string) || 'default-store';

      const category = await categoryService.createCategory(storeId, dto);

      res.status(201).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async tree(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const ctx = requestContext.getStore();
      const user = (req as any).user;
      const storeId = ctx?.tenantId || user?.tenantId || (req.headers['x-tenant-id'] as string) || 'default-store';

      const tree = await categoryService.getCategoryTree(storeId);

      res.status(200).json({
        success: true,
        data: tree,
      });
    } catch (error) {
      next(error);
    }
  }

  async breadcrumbs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const breadcrumbs = await categoryService.getBreadcrumbs(id);

      res.status(200).json({
        success: true,
        data: breadcrumbs,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const dto = updateCategorySchema.parse(req.body);
      const ctx = requestContext.getStore();
      const user = (req as any).user;
      const storeId = ctx?.tenantId || user?.tenantId || (req.headers['x-tenant-id'] as string) || 'default-store';

      const category = await categoryService.updateCategory(id, storeId, dto);

      res.status(200).json({
        success: true,
        data: category,
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

      await categoryService.deleteCategory(id, storeId);

      res.status(200).json({
        success: true,
        message: 'Category deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const categoryController = new CategoryController();
