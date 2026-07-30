import { Identifier } from '../..';
import { IProductContract } from '../contracts';

/**
 * Catalog Repository Interface Architecture Contract
 */
export interface ICatalogRepository {
  findProductById(id: Identifier): Promise<IProductContract | null>;
  searchProducts(query: string): Promise<readonly IProductContract[]>;
}
