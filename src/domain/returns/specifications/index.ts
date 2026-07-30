/**
 * Returns Domain Specifications
 *
 * @module domain/returns/specifications
 */

import { CompositeSpecification } from '../..';
import { ReturnAggregate } from '../aggregates';
import { DEFAULT_RETURN_WINDOW_DAYS } from '../constants';
import { ReturnWindow } from '../value-objects';

export class ReturnAllowedSpecification extends CompositeSpecification<ReturnAggregate> {
  public isSatisfiedBy(candidate: ReturnAggregate): boolean {
    return candidate.status === 'REQUESTED' && candidate.items.length > 0;
  }
}

export class ReturnWindowOpenSpecification extends CompositeSpecification<Date> {
  private readonly window: ReturnWindow;

  constructor(allowedDays: number = DEFAULT_RETURN_WINDOW_DAYS) {
    super();
    this.window = new ReturnWindow(allowedDays);
  }

  public isSatisfiedBy(deliveredAt: Date): boolean {
    return this.window.isOpen(deliveredAt);
  }
}
