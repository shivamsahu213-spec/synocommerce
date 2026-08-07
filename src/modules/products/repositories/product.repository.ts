import { BaseRepository } from '../../../database/repository/base.repository';
import { Product, Prisma } from '@prisma/client';
import { prisma } from '../../../database/prisma';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductSearchQueryDto } from '../dto/search.dto';

export class ProductRepository extends BaseRepository<Product> {
  protected model = 'product' as const;

  async findProductWithDetails(id: string, storeId?: string): Promise<any> {
    const where: Prisma.ProductWhereInput = {
      id,
      deletedAt: null,
      ...(storeId ? { storeId } : {}),
    };

    return prisma.product.findFirst({
      where,
      include: {
        brand: true,
        categories: { include: { category: true } },
        collections: { include: { collection: true } },
        variants: { where: { deletedAt: null } },
        mediaLinks: { include: { media: true }, orderBy: { sortOrder: 'asc' } },
        inventory: true,
      },
    });
  }

  async createProduct(storeId: string, dto: CreateProductDto): Promise<any> {
    return prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          storeId,
          sku: dto.sku,
          name: dto.name,
          description: dto.description ?? null,
          price: dto.price,
          currency: dto.currency as any,
          status: dto.status as any,
          barcode: dto.barcode ?? null,
          weight: dto.weight ?? null,
          dimensions: (dto.dimensions as any) ?? null,
          brandId: dto.brandId ?? null,
          seoTitle: dto.seoTitle ?? null,
          seoDescription: dto.seoDescription ?? null,
          seoKeywords: dto.seoKeywords ?? [],
          canonicalUrl: dto.canonicalUrl ?? null,
          ogImage: dto.ogImage ?? null,
          tags: dto.tags ?? [],
          isActive: dto.isActive,
        },
      });

      // Attach categories
      if (dto.categoryIds && dto.categoryIds.length > 0) {
        await tx.productCategory.createMany({
          data: dto.categoryIds.map((catId) => ({
            productId: product.id,
            categoryId: catId,
          })),
        });
      }

      // Attach collections
      if (dto.collectionIds && dto.collectionIds.length > 0) {
        await tx.productCollection.createMany({
          data: dto.collectionIds.map((colId) => ({
            productId: product.id,
            collectionId: colId,
          })),
        });
      }

      // Create variants
      if (dto.variants && dto.variants.length > 0) {
        await tx.productVariant.createMany({
          data: dto.variants.map((v) => ({
            productId: product.id,
            sku: v.sku,
            barcode: v.barcode ?? null,
            price: v.price ? v.price : dto.price,
            size: v.size ?? null,
            color: v.color ?? null,
            material: v.material ?? null,
            storage: v.storage ?? null,
            packSize: v.packSize ?? null,
            weight: v.weight ?? null,
            dimensions: (v.dimensions as any) ?? null,
            isActive: v.isActive,
          })),
        });
      }

      // Create assets / media
      if (dto.assets && dto.assets.length > 0) {
        for (const asset of dto.assets) {
          const media = await tx.media.create({
            data: {
              storeId,
              url: asset.url,
              type: asset.type,
              altText: asset.altText ?? null,
            },
          });

          await tx.productMedia.create({
            data: {
              productId: product.id,
              mediaId: media.id,
              sortOrder: asset.sortOrder,
            },
          });
        }
      }

      return product;
    });
  }

  async updateProduct(id: string, storeId: string, dto: UpdateProductDto): Promise<any> {
    return prisma.$transaction(async (tx) => {
      const product = await tx.product.update({
        where: { id },
        data: {
          ...(dto.sku ? { sku: dto.sku } : {}),
          ...(dto.name ? { name: dto.name } : {}),
          ...(dto.description !== undefined ? { description: dto.description } : {}),
          ...(dto.price !== undefined ? { price: dto.price } : {}),
          ...(dto.currency ? { currency: dto.currency as any } : {}),
          ...(dto.status ? { status: dto.status as any } : {}),
          ...(dto.barcode !== undefined ? { barcode: dto.barcode } : {}),
          ...(dto.weight !== undefined ? { weight: dto.weight } : {}),
          ...(dto.dimensions !== undefined ? { dimensions: dto.dimensions as any } : {}),
          ...(dto.brandId !== undefined ? { brandId: dto.brandId } : {}),
          ...(dto.seoTitle !== undefined ? { seoTitle: dto.seoTitle } : {}),
          ...(dto.seoDescription !== undefined ? { seoDescription: dto.seoDescription } : {}),
          ...(dto.seoKeywords !== undefined ? { seoKeywords: dto.seoKeywords } : {}),
          ...(dto.canonicalUrl !== undefined ? { canonicalUrl: dto.canonicalUrl } : {}),
          ...(dto.ogImage !== undefined ? { ogImage: dto.ogImage } : {}),
          ...(dto.tags !== undefined ? { tags: dto.tags } : {}),
          ...(dto.isActive !== undefined ? { isActive: dto.isActive } : {}),
        },
      });

      if (dto.categoryIds) {
        await tx.productCategory.deleteMany({ where: { productId: id } });
        if (dto.categoryIds.length > 0) {
          await tx.productCategory.createMany({
            data: dto.categoryIds.map((catId) => ({
              productId: id,
              categoryId: catId,
            })),
          });
        }
      }

      if (dto.collectionIds) {
        await tx.productCollection.deleteMany({ where: { productId: id } });
        if (dto.collectionIds.length > 0) {
          await tx.productCollection.createMany({
            data: dto.collectionIds.map((colId) => ({
              productId: id,
              collectionId: colId,
            })),
          });
        }
      }

      return product;
    });
  }

  async softDeleteProduct(id: string, deletedBy?: string): Promise<any> {
    return prisma.product.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy: deletedBy ?? null,
        isActive: false,
      },
    });
  }

  async searchProducts(storeId: string, query: ProductSearchQueryDto): Promise<{ items: any[]; total: number; page: number; limit: number }> {
    const {
      q,
      sku,
      barcode,
      brandId,
      brand,
      categoryId,
      category,
      collectionId,
      collection,
      minPrice,
      maxPrice,
      status,
      isActive,
      tags,
      createdAfter,
      createdBefore,
      updatedAfter,
      updatedBefore,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 20,
    } = query;

    const where: Prisma.ProductWhereInput = {
      storeId,
      deletedAt: null,
      ...(isActive !== undefined ? { isActive } : {}),
      ...(status ? { status: status as any } : {}),
      ...(sku ? { sku: { contains: sku, mode: 'insensitive' } } : {}),
      ...(barcode ? { barcode } : {}),
      ...(brandId ? { brandId } : {}),
      ...(brand ? { brand: { name: { contains: brand, mode: 'insensitive' } } } : {}),
      ...(minPrice !== undefined || maxPrice !== undefined
        ? {
            price: {
              ...(minPrice !== undefined ? { gte: minPrice } : {}),
              ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
            },
          }
        : {}),
      ...(createdAfter || createdBefore
        ? {
            createdAt: {
              ...(createdAfter ? { gte: new Date(createdAfter) } : {}),
              ...(createdBefore ? { lte: new Date(createdBefore) } : {}),
            },
          }
        : {}),
      ...(updatedAfter || updatedBefore
        ? {
            updatedAt: {
              ...(updatedAfter ? { gte: new Date(updatedAfter) } : {}),
              ...(updatedBefore ? { lte: new Date(updatedBefore) } : {}),
            },
          }
        : {}),
    };

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { sku: { contains: q, mode: 'insensitive' } },
        { barcode: { contains: q, mode: 'insensitive' } },
      ];
    }

    if (tags) {
      const tagList = Array.isArray(tags) ? tags : [tags];
      where.tags = { hasSome: tagList };
    }

    if (categoryId || category) {
      where.categories = {
        some: {
          category: {
            ...(categoryId ? { id: categoryId } : {}),
            ...(category ? { name: { contains: category, mode: 'insensitive' } } : {}),
          },
        },
      };
    }

    if (collectionId || collection) {
      where.collections = {
        some: {
          collection: {
            ...(collectionId ? { id: collectionId } : {}),
            ...(collection ? { name: { contains: collection, mode: 'insensitive' } } : {}),
          },
        },
      };
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          brand: true,
          categories: { include: { category: true } },
          collections: { include: { collection: true } },
          variants: true,
          inventory: true,
          mediaLinks: { include: { media: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async bulkUpdateStatus(productIds: string[], status: 'ACTIVE' | 'ARCHIVED' | 'DRAFT'): Promise<number> {
    const result = await prisma.product.updateMany({
      where: { id: { in: productIds } },
      data: {
        status: status as any,
        isActive: status === 'ACTIVE',
      },
    });
    return result.count;
  }

  async bulkSoftDelete(productIds: string[], deletedBy?: string): Promise<number> {
    const result = await prisma.product.updateMany({
      where: { id: { in: productIds } },
      data: {
        deletedAt: new Date(),
        deletedBy: deletedBy ?? null,
        isActive: false,
      },
    });
    return result.count;
  }
}

export const productRepository = new ProductRepository();
