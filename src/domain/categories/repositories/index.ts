import { IBaseRepository, Identifier } from '../..';
import { CategoryAggregate } from '../aggregates';
import { CategoryNode } from '../types';

export interface ICategoryRepository extends IBaseRepository<CategoryAggregate, Identifier> {
  findBySlug(slug: string): Promise<CategoryAggregate | null>;
  getTree(): Promise<readonly CategoryNode[]>;
}
