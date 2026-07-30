import { IBaseRepository, Identifier } from '../..';
import { ProductAggregate } from '../aggregates';

export interface IProductRepository extends IBaseRepository<ProductAggregate, Identifier> {
  findBySlug(slug: string): Promise<ProductAggregate | null>;
  findBySku(sku: string): Promise<ProductAggregate | null>;
}
