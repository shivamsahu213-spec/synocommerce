import { CartAggregate } from '../aggregates';

export interface ICartMergeService {
  mergeCarts(guestCart: CartAggregate, userCart: CartAggregate): CartAggregate;
}
