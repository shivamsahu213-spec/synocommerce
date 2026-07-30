/**
 * Payments Domain Specifications
 *
 * @module domain/payments/specifications
 */

import { CompositeSpecification } from '../..';
import { PaymentAggregate } from '../aggregates';
import { MAX_PAYMENT_RETRIES } from '../constants';

export class PaymentAllowedSpecification extends CompositeSpecification<PaymentAggregate> {
  public isSatisfiedBy(candidate: PaymentAggregate): boolean {
    return candidate.status === 'PENDING';
  }
}

export class PaymentCapturableSpecification extends CompositeSpecification<PaymentAggregate> {
  public isSatisfiedBy(candidate: PaymentAggregate): boolean {
    return candidate.status === 'AUTHORIZED' && candidate.authorization !== undefined;
  }
}

export class PaymentRefundableSpecification extends CompositeSpecification<PaymentAggregate> {
  public isSatisfiedBy(candidate: PaymentAggregate): boolean {
    return candidate.status === 'CAPTURED' || candidate.status === 'DISPUTED';
  }
}

export class PaymentRetryAllowedSpecification extends CompositeSpecification<number> {
  public isSatisfiedBy(attemptCount: number): boolean {
    return attemptCount >= 0 && attemptCount < MAX_PAYMENT_RETRIES;
  }
}
