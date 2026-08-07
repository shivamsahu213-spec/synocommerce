import { Request, Response, NextFunction } from 'express';
import { collectionService } from '../services/collection.service';
import { createCollectionSchema } from '../dto/create-collection.dto';
import { updateCollectionSchema } from '../dto/update-collection.dto';
import { requestContext } from '../../../context/requestContext';

export class CollectionController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = createCollectionSchema.parse(req.body);
      const ctx = requestContext.getStore();
      const user = (req as any).user;
      const storeId = ctx?.tenantId || user?.tenantId || (req.headers['x-tenant-id'] as string) || 'default-store';

      const collection = await collectionService.createCollection(storeId, dto);

      res.status(201).json({
        success: true,
        data: collection,
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

      const collections = await collectionService.getCollections(storeId);

      res.status(200).json({
        success: true,
        data: collections,
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

      const collection = await collectionService.getCollectionById(id, storeId);

      res.status(200).json({
        success: true,
        data: collection,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const dto = updateCollectionSchema.parse(req.body);
      const ctx = requestContext.getStore();
      const user = (req as any).user;
      const storeId = ctx?.tenantId || user?.tenantId || (req.headers['x-tenant-id'] as string) || 'default-store';

      const collection = await collectionService.updateCollection(id, storeId, dto);

      res.status(200).json({
        success: true,
        data: collection,
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

      await collectionService.deleteCollection(id, storeId);

      res.status(200).json({
        success: true,
        message: 'Collection deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const collectionController = new CollectionController();
