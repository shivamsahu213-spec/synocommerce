import { productRepository } from '../repositories/product.repository';
import { ProductSearchQueryDto } from '../dto/search.dto';
import { productCache } from '../utils/productCache';
import { logger } from '../../../common/logger';

export class SearchService {
  async searchProducts(storeId: string, query: ProductSearchQueryDto) {
    const cacheKey = `search:query:${storeId}:${JSON.stringify(query)}`;
    const cached = await productCache.get<any>(cacheKey);
    if (cached) {
      return cached;
    }

    logger.info({ storeId, query: query.q, filters: query }, 'Executing product search query');

    const result = await productRepository.searchProducts(storeId, query);

    await productCache.set(cacheKey, result, 120);
    return result;
  }
}

export const searchService = new SearchService();
