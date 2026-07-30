/**
 * Catalog Domain Services Architecture Placeholder
 * @module domain/catalog/services
 */

export interface ICatalogSearchService {
  indexProduct(productId: string): Promise<void>;
}
