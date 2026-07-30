import { IBaseRepository, Identifier } from '../..';
import { BrandAggregate } from '../aggregates';

export interface IBrandRepository extends IBaseRepository<BrandAggregate, Identifier> {
  findBySlug(slug: string): Promise<BrandAggregate | null>;
  findActiveBrands(): Promise<readonly BrandAggregate[]>;
}
