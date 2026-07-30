/**
 * Shared Domain Base Specifications
 * @module domain/shared-domain/specifications
 */

import { ISpecification } from '../contracts';

export abstract class CompositeSpecification<TCandidate> implements ISpecification<TCandidate> {
  public abstract isSatisfiedBy(candidate: TCandidate): boolean;

  public and(other: ISpecification<TCandidate>): ISpecification<TCandidate> {
    return new AndSpecification(this, other);
  }

  public or(other: ISpecification<TCandidate>): ISpecification<TCandidate> {
    return new OrSpecification(this, other);
  }

  public not(): ISpecification<TCandidate> {
    return new NotSpecification(this);
  }
}

class AndSpecification<TCandidate> extends CompositeSpecification<TCandidate> {
  constructor(
    private readonly left: ISpecification<TCandidate>,
    private readonly right: ISpecification<TCandidate>
  ) {
    super();
  }

  public isSatisfiedBy(candidate: TCandidate): boolean {
    return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate);
  }
}

class OrSpecification<TCandidate> extends CompositeSpecification<TCandidate> {
  constructor(
    private readonly left: ISpecification<TCandidate>,
    private readonly right: ISpecification<TCandidate>
  ) {
    super();
  }

  public isSatisfiedBy(candidate: TCandidate): boolean {
    return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate);
  }
}

class NotSpecification<TCandidate> extends CompositeSpecification<TCandidate> {
  constructor(private readonly spec: ISpecification<TCandidate>) {
    super();
  }

  public isSatisfiedBy(candidate: TCandidate): boolean {
    return !this.spec.isSatisfiedBy(candidate);
  }
}
