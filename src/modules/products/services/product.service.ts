import { productRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductSearchQueryDto } from '../dto/search.dto';
import { BulkProductActionDto } from '../dto/bulk-product.dto';
import { productCache } from '../utils/productCache';
import { NotFoundError, BadRequestError } from '../../../common/errors';
import { logger } from '../../../common/logger';
import { prisma } from '../../../database/prisma';

export class ProductService {
  private async getTenantId(storeId: string): Promise<string> {
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (store) return store.tenantId;
    const tenant = await prisma.tenant.findFirst();
    return tenant ? tenant.id : storeId;
  }

  async createProduct(storeId: string, userId: string | undefined, dto: CreateProductDto) {
    const existing = await productRepository.findFirst({ storeId, sku: dto.sku });
    if (existing) {
      throw new BadRequestError(`Product with SKU '${dto.sku}' already exists.`);
    }

    const product = await productRepository.createProduct(storeId, dto);
    const tenantId = await this.getTenantId(storeId);

    // Audit log
    await prisma.auditLog.create({
      data: {
        tenantId,
        actorId: userId || null,
        action: 'PRODUCT_CREATED',
        targetId: product.id,
        metadata: { sku: dto.sku, name: dto.name, price: dto.price },
      },
    });

    await productCache.invalidateProductCatalog(storeId);
    logger.info({ productId: product.id, storeId }, 'Product created successfully');
    return product;
  }

  async getProductById(id: string, storeId?: string) {
    const cacheKey = `product:${storeId || 'global'}:${id}`;
    const cached = await productCache.get<any>(cacheKey);
    if (cached) return cached;

    const product = await productRepository.findProductWithDetails(id, storeId);
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    await productCache.set(cacheKey, product);
    return product;
  }

  async updateProduct(id: string, storeId: string, userId: string | undefined, dto: UpdateProductDto) {
    const existing = await productRepository.findProductWithDetails(id, storeId);
    if (!existing) {
      throw new NotFoundError('Product not found');
    }

    const updated = await productRepository.updateProduct(id, storeId, dto);
    const tenantId = await this.getTenantId(storeId);

    // Audit log
    await prisma.auditLog.create({
      data: {
        tenantId,
        actorId: userId || null,
        action: 'PRODUCT_UPDATED',
        targetId: id,
        metadata: { changes: dto as any },
      },
    });

    await productCache.invalidateProductCatalog(storeId);
    logger.info({ productId: id, storeId }, 'Product updated successfully');
    return updated;
  }

  async deleteProduct(id: string, storeId: string, userId: string | undefined) {
    const existing = await productRepository.findProductWithDetails(id, storeId);
    if (!existing) {
      throw new NotFoundError('Product not found');
    }

    const deleted = await productRepository.softDeleteProduct(id, userId);
    const tenantId = await this.getTenantId(storeId);

    // Audit log
    await prisma.auditLog.create({
      data: {
        tenantId,
        actorId: userId || null,
        action: 'PRODUCT_DELETED',
        targetId: id,
      },
    });

    await productCache.invalidateProductCatalog(storeId);
    logger.info({ productId: id, storeId }, 'Product deleted successfully');
    return deleted;
  }

  async listProducts(storeId: string, query: ProductSearchQueryDto) {
    const cacheKey = `search:${storeId}:${JSON.stringify(query)}`;
    const cached = await productCache.get<any>(cacheKey);
    if (cached) return cached;

    const result = await productRepository.searchProducts(storeId, query);
    await productCache.set(cacheKey, result, 120);
    return result;
  }

  async bulkOperations(storeId: string, userId: string | undefined, dto: BulkProductActionDto) {
    const { action, productIds = [], products = [], updateData } = dto;
    let affectedCount = 0;

    if (action === 'CREATE' && products.length > 0) {
      for (const p of products) {
        await this.createProduct(storeId, userId, p);
        affectedCount++;
      }
    } else if (action === 'PUBLISH' && productIds.length > 0) {
      affectedCount = await productRepository.bulkUpdateStatus(productIds, 'ACTIVE');
    } else if (action === 'ARCHIVE' && productIds.length > 0) {
      affectedCount = await productRepository.bulkUpdateStatus(productIds, 'ARCHIVED');
    } else if (action === 'DELETE' && productIds.length > 0) {
      affectedCount = await productRepository.bulkSoftDelete(productIds, userId);
    } else if (action === 'UPDATE' && productIds.length > 0 && updateData) {
      for (const id of productIds) {
        await productRepository.updateProduct(id, storeId, updateData);
        affectedCount++;
      }
    }

    const tenantId = await this.getTenantId(storeId);

    await prisma.auditLog.create({
      data: {
        tenantId,
        actorId: userId || null,
        action: `PRODUCT_BULK_${action}`,
        targetId: storeId,
        metadata: { action, count: affectedCount, productIds },
      },
    });

    await productCache.invalidateProductCatalog(storeId);
    logger.info({ action, affectedCount, storeId }, 'Bulk product operation executed');
    return { success: true, action, affectedCount };
  }
}

export const productService = new ProductService();
