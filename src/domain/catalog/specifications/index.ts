import { CompositeSpecification } from '../..';
import { IProductContract } from '../contracts';

export class PublishedProductContractSpecification extends CompositeSpecification<IProductContract> {
  public isSatisfiedBy(candidate: IProductContract): boolean {
    return candidate.status === 'PUBLISHED' && candidate.visibility === 'PUBLIC';
  }
}
