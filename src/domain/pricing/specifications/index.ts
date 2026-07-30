import { CompositeSpecification } from '../..';
import { IPriceRule } from '../contracts';

export class ActivePriceRuleSpecification extends CompositeSpecification<IPriceRule> {
  public isSatisfiedBy(candidate: IPriceRule): boolean {
    if (!candidate.dateRange) return true;
    return candidate.dateRange.contains(new Date());
  }
}
