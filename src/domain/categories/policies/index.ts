import { IDomainPolicy } from '../..';
import { CategoryAggregate } from '../aggregates';

export interface ICategoryHierarchyPolicy extends IDomainPolicy<CategoryAggregate> {
  canSetParent(category: CategoryAggregate, parentCandidate: CategoryAggregate): boolean;
}
