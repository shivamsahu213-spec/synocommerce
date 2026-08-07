import { categoryRepository } from '../repositories/category.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { productCache } from '../utils/productCache';
import { NotFoundError, BadRequestError } from '../../../common/errors';
import { logger } from '../../../common/logger';

export class CategoryService {
  async createCategory(storeId: string, dto: CreateCategoryDto) {
    const existing = await categoryRepository.findFirst({ storeId, slug: dto.slug });
    if (existing) {
      throw new BadRequestError(`Category with slug '${dto.slug}' already exists.`);
    }

    const category = await categoryRepository.createCategory(storeId, dto);
    await productCache.invalidateProductCatalog(storeId);
    logger.info({ categoryId: category.id, storeId }, 'Category created');
    return category;
  }

  async getCategoryTree(storeId: string) {
    const cacheKey = `category:tree:${storeId}`;
    const cached = await productCache.get<any>(cacheKey);
    if (cached) return cached;

    const tree = await categoryRepository.findCategoryTree(storeId);
    await productCache.set(cacheKey, tree);
    return tree;
  }

  async getBreadcrumbs(categoryId: string) {
    return categoryRepository.getBreadcrumbs(categoryId);
  }

  async updateCategory(id: string, storeId: string, dto: UpdateCategoryDto) {
    const category = await categoryRepository.findById(id);
    if (!category || category.storeId !== storeId) {
      throw new NotFoundError('Category not found');
    }

    const updated = await categoryRepository.updateCategory(id, dto);
    await productCache.invalidateProductCatalog(storeId);
    return updated;
  }

  async deleteCategory(id: string, storeId: string) {
    const category = await categoryRepository.findById(id);
    if (!category || category.storeId !== storeId) {
      throw new NotFoundError('Category not found');
    }

    const deleted = await categoryRepository.softDeleteCategory(id);
    await productCache.invalidateProductCatalog(storeId);
    return deleted;
  }
}

export const categoryService = new CategoryService();
