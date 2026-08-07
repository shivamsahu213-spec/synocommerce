import { BaseRepository } from '../../../database/repository/base.repository';
import { Category } from '@prisma/client';
import { prisma } from '../../../database/prisma';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export class CategoryRepository extends BaseRepository<Category> {
  protected model = 'category' as const;

  async findCategoryTree(storeId: string): Promise<any[]> {
    const categories = await prisma.category.findMany({
      where: {
        storeId,
        deletedAt: null,
      },
      orderBy: { sortOrder: 'asc' },
    });

    const categoryMap = new Map<string, any>();
    const tree: any[] = [];

    categories.forEach((cat) => {
      categoryMap.set(cat.id, { ...cat, children: [] });
    });

    categories.forEach((cat) => {
      if (cat.parentId && categoryMap.has(cat.parentId)) {
        categoryMap.get(cat.parentId).children.push(categoryMap.get(cat.id));
      } else {
        tree.push(categoryMap.get(cat.id));
      }
    });

    return tree;
  }

  async getBreadcrumbs(categoryId: string): Promise<any[]> {
    const breadcrumbs: any[] = [];
    let currentId: string | null = categoryId;

    while (currentId) {
      const category: Category | null = await prisma.category.findUnique({
        where: { id: currentId },
      });

      if (!category || category.deletedAt) break;

      breadcrumbs.unshift({
        id: category.id,
        name: category.name,
        slug: category.slug,
      });

      currentId = category.parentId;
    }

    return breadcrumbs;
  }

  async createCategory(storeId: string, dto: CreateCategoryDto): Promise<Category> {
    return prisma.category.create({
      data: {
        storeId,
        name: dto.name,
        slug: dto.slug,
        description: dto.description ?? null,
        parentId: dto.parentId || null,
        isFeatured: dto.isFeatured ?? false,
        sortOrder: dto.sortOrder ?? 0,
      },
    });
  }

  async updateCategory(id: string, dto: UpdateCategoryDto): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data: {
        ...(dto.name ? { name: dto.name } : {}),
        ...(dto.slug ? { slug: dto.slug } : {}),
        ...(dto.description !== undefined ? { description: dto.description } : {}),
        ...(dto.parentId !== undefined ? { parentId: dto.parentId } : {}),
        ...(dto.isFeatured !== undefined ? { isFeatured: dto.isFeatured } : {}),
        ...(dto.sortOrder !== undefined ? { sortOrder: dto.sortOrder } : {}),
      },
    });
  }

  async softDeleteCategory(id: string): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

export const categoryRepository = new CategoryRepository();
