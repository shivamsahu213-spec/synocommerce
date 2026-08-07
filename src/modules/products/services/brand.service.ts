import { brandRepository } from '../repositories/brand.repository';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { productCache } from '../utils/productCache';
import { NotFoundError, BadRequestError } from '../../../common/errors';
import { logger } from '../../../common/logger';

export class BrandService {
  async createBrand(storeId: string, dto: CreateBrandDto) {
    const existing = await brandRepository.findFirst({ storeId, slug: dto.slug });
    if (existing) {
      throw new BadRequestError(`Brand with slug '${dto.slug}' already exists.`);
    }

    const brand = await brandRepository.createBrand(storeId, dto);
    await productCache.invalidateProductCatalog(storeId);
    logger.info({ brandId: brand.id, storeId }, 'Brand created');
    return brand;
  }

  async getBrands(storeId: string) {
    const cacheKey = `brand:list:${storeId}`;
    const cached = await productCache.get<any>(cacheKey);
    if (cached) return cached;

    const brands = await brandRepository.findMany({ where: { storeId, deletedAt: null } });
    await productCache.set(cacheKey, brands);
    return brands;
  }

  async getBrandById(id: string, storeId: string) {
    const brand = await brandRepository.findById(id);
    if (!brand || brand.storeId !== storeId) {
      throw new NotFoundError('Brand not found');
    }
    return brand;
  }

  async updateBrand(id: string, storeId: string, dto: UpdateBrandDto) {
    const brand = await brandRepository.findById(id);
    if (!brand || brand.storeId !== storeId) {
      throw new NotFoundError('Brand not found');
    }

    const updated = await brandRepository.updateBrand(id, dto);
    await productCache.invalidateProductCatalog(storeId);
    return updated;
  }

  async deleteBrand(id: string, storeId: string) {
    const brand = await brandRepository.findById(id);
    if (!brand || brand.storeId !== storeId) {
      throw new NotFoundError('Brand not found');
    }

    const deleted = await brandRepository.softDeleteBrand(id);
    await productCache.invalidateProductCatalog(storeId);
    return deleted;
  }
}

export const brandService = new BrandService();
