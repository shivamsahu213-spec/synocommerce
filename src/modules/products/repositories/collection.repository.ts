import { BaseRepository } from '../../../database/repository/base.repository';
import { Collection, Prisma } from '@prisma/client';
import { prisma } from '../../../database/prisma';
import { CreateCollectionDto, CollectionRuleDto } from '../dto/create-collection.dto';
import { UpdateCollectionDto } from '../dto/update-collection.dto';

export class CollectionRepository extends BaseRepository<Collection> {
  protected model = 'collection' as const;

  async createCollection(storeId: string, dto: CreateCollectionDto): Promise<Collection> {
    return prisma.collection.create({
      data: {
        storeId,
        name: dto.name,
        slug: dto.slug,
        description: dto.description ?? null,
        type: dto.type as any,
        rules: (dto.rules as any) ?? null,
        isActive: dto.isActive ?? true,
      },
    });
  }

  async updateCollection(id: string, dto: UpdateCollectionDto): Promise<Collection> {
    return prisma.collection.update({
      where: { id },
      data: {
        ...(dto.name ? { name: dto.name } : {}),
        ...(dto.slug ? { slug: dto.slug } : {}),
        ...(dto.description !== undefined ? { description: dto.description } : {}),
        ...(dto.type ? { type: dto.type as any } : {}),
        ...(dto.rules !== undefined ? { rules: dto.rules as any } : {}),
        ...(dto.isActive !== undefined ? { isActive: dto.isActive } : {}),
      },
    });
  }

  async evaluateSmartCollection(collectionId: string, storeId: string): Promise<any[]> {
    const collection = await prisma.collection.findUnique({
      where: { id: collectionId },
    });

    if (!collection || collection.type !== 'SMART' || !collection.rules) {
      return [];
    }

    const rules = collection.rules as CollectionRuleDto[];
    const conditions: Prisma.ProductWhereInput[] = [];

    for (const rule of rules) {
      if (rule.field === 'price') {
        const val = Number(rule.value);
        if (rule.operator === 'gt') conditions.push({ price: { gt: val } });
        if (rule.operator === 'gte') conditions.push({ price: { gte: val } });
        if (rule.operator === 'lt') conditions.push({ price: { lt: val } });
        if (rule.operator === 'lte') conditions.push({ price: { lte: val } });
        if (rule.operator === 'equals') conditions.push({ price: { equals: val } });
      } else if (rule.field === 'category') {
        conditions.push({
          categories: {
            some: {
              category: { name: { contains: String(rule.value), mode: 'insensitive' } },
            },
          },
        });
      } else if (rule.field === 'brand') {
        conditions.push({
          brand: { name: { contains: String(rule.value), mode: 'insensitive' } },
        });
      } else if (rule.field === 'tag') {
        conditions.push({
          tags: { has: String(rule.value) },
        });
      }
    }

    const matchingProducts = await prisma.product.findMany({
      where: {
        storeId,
        deletedAt: null,
        AND: conditions,
      },
    });

    // Auto sync relations in productCollection table
    if (matchingProducts.length > 0) {
      await prisma.productCollection.deleteMany({ where: { collectionId } });
      await prisma.productCollection.createMany({
        data: matchingProducts.map((p) => ({
          productId: p.id,
          collectionId,
        })),
        skipDuplicates: true,
      });
    }

    return matchingProducts;
  }

  async softDeleteCollection(id: string): Promise<Collection> {
    return prisma.collection.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
  }
}

export const collectionRepository = new CollectionRepository();
