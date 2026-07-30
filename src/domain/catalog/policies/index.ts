import { IDomainPolicy } from '../..';
import { IProductContract } from '../contracts';

export interface ICatalogPublishingPolicy extends IDomainPolicy<IProductContract> {
  canPublish(product: IProductContract): boolean;
}
