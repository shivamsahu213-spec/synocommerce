import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../../database/prisma';
import { z } from 'zod';
import { requestContext } from '../../../context/requestContext';

const createAssetMetadataSchema = z.object({
  productId: z.string().optional(),
  url: z.string().url(),
  type: z.enum(['image', 'video', 'pdf', 'manual', 'gallery', 'featured']).default('image'),
  altText: z.string().optional(),
  sortOrder: z.number().int().default(0),
});

export class AssetController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = createAssetMetadataSchema.parse(req.body);
      const ctx = requestContext.getStore();
      const user = (req as any).user;
      const storeId = ctx?.tenantId || user?.tenantId || (req.headers['x-tenant-id'] as string) || 'default-store';

      const media = await prisma.media.create({
        data: {
          storeId,
          url: dto.url,
          type: dto.type,
          altText: dto.altText ?? null,
        },
      });

      if (dto.productId) {
        await prisma.productMedia.create({
          data: {
            productId: dto.productId,
            mediaId: media.id,
            sortOrder: dto.sortOrder,
          },
        });
      }

      res.status(201).json({
        success: true,
        data: media,
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

      const media = await prisma.media.findMany({
        where: { storeId },
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json({
        success: true,
        data: media,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const assetController = new AssetController();
