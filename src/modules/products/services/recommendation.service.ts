import { prisma } from '../../../database/prisma';

export class RecommendationService {
  async getRelatedProducts(productId: string, storeId: string, limit = 5) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { categories: true },
    });

    if (!product) return [];

    const categoryIds = product.categories.map((c) => c.categoryId);

    return prisma.product.findMany({
      where: {
        storeId,
        id: { not: productId },
        deletedAt: null,
        categories: { some: { categoryId: { in: categoryIds } } },
      },
      take: limit,
      include: { brand: true, mediaLinks: { include: { media: true } } },
    });
  }

  async getFrequentlyBoughtTogether(productId: string, storeId: string, limit = 4) {
    // Placeholder returning complimentary store items
    return prisma.product.findMany({
      where: {
        storeId,
        id: { not: productId },
        deletedAt: null,
        status: 'ACTIVE',
      },
      take: limit,
      include: { brand: true, mediaLinks: { include: { media: true } } },
    });
  }

  async getTrendingProducts(storeId: string, limit = 10) {
    // Placeholder returning top active products
    return prisma.product.findMany({
      where: {
        storeId,
        deletedAt: null,
        status: 'ACTIVE',
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { brand: true, mediaLinks: { include: { media: true } } },
    });
  }
}

export const recommendationService = new RecommendationService();
