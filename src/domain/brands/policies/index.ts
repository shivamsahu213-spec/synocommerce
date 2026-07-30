import { IDomainPolicy } from '../..';
import { BrandAggregate } from '../aggregates';

export interface IBrandActivePolicy extends IDomainPolicy<BrandAggregate> {
  canAssociateProducts(brand: BrandAggregate): boolean;
}
