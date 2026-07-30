import { CompositeSpecification } from '../..';
import { CheckoutSessionAggregate } from '../aggregates';

export class CanCheckoutSpecification extends CompositeSpecification<CheckoutSessionAggregate> {
  public isSatisfiedBy(candidate: CheckoutSessionAggregate): boolean {
    return Boolean(
      candidate.shippingSelection &&
      candidate.billingSelection &&
      candidate.paymentSelection
    );
  }
}

export class PaymentRequiredSpecification extends CompositeSpecification<CheckoutSessionAggregate> {
  public isSatisfiedBy(candidate: CheckoutSessionAggregate): boolean {
    return candidate.paymentSelection !== undefined;
  }
}
