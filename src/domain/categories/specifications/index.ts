import { CompositeSpecification } from '../..';
import { CategoryAggregate } from '../aggregates';

export class RootCategorySpecification extends CompositeSpecification<CategoryAggregate> {
  public isSatisfiedBy(candidate: CategoryAggregate): boolean {
    return candidate.parentId === undefined;
  }
}
