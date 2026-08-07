import { collectionRepository } from '../repositories/collection.repository';
import { CreateCollectionDto } from '../dto/create-collection.dto';
import { UpdateCollectionDto } from '../dto/update-collection.dto';
import { productCache } from '../utils/productCache';
import { NotFoundError, BadRequestError } from '../../../common/errors';
import { logger } from '../../../common/logger';

export class CollectionService {
  async createCollection(storeId: string, dto: CreateCollectionDto) {
    const existing = await collectionRepository.findFirst({ storeId, slug: dto.slug });
    if (existing) {
      throw new BadRequestError(`Collection with slug '${dto.slug}' already exists.`);
    }

    const collection = await collectionRepository.createCollection(storeId, dto);
    
    if (collection.type === 'SMART') {
      await collectionRepository.evaluateSmartCollection(collection.id, storeId);
    }

    await productCache.invalidateProductCatalog(storeId);
    logger.info({ collectionId: collection.id, storeId }, 'Collection created');
    return collection;
  }

  async getCollections(storeId: string) {
    const cacheKey = `collection:list:${storeId}`;
    const cached = await productCache.get<any>(cacheKey);
    if (cached) return cached;

    const collections = await collectionRepository.findMany({ where: { storeId, deletedAt: null } });
    await productCache.set(cacheKey, collections);
    return collections;
  }

  async getCollectionById(id: string, storeId: string) {
    const collection = await collectionRepository.findById(id);
    if (!collection || collection.storeId !== storeId) {
      throw new NotFoundError('Collection not found');
    }
    return collection;
  }

  async updateCollection(id: string, storeId: string, dto: UpdateCollectionDto) {
    const collection = await collectionRepository.findById(id);
    if (!collection || collection.storeId !== storeId) {
      throw new NotFoundError('Collection not found');
    }

    const updated = await collectionRepository.updateCollection(id, dto);

    if (updated.type === 'SMART') {
      await collectionRepository.evaluateSmartCollection(updated.id, storeId);
    }

    await productCache.invalidateProductCatalog(storeId);
    return updated;
  }

  async deleteCollection(id: string, storeId: string) {
    const collection = await collectionRepository.findById(id);
    if (!collection || collection.storeId !== storeId) {
      throw new NotFoundError('Collection not found');
    }

    const deleted = await collectionRepository.softDeleteCollection(id);
    await productCache.invalidateProductCatalog(storeId);
    return deleted;
  }
}

export const collectionService = new CollectionService();
