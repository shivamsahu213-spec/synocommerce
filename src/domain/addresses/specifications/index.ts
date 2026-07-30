import { CompositeSpecification } from '../..';
import { AddressAggregate } from '../aggregates';

export class AddressValidSpecification extends CompositeSpecification<AddressAggregate> {
  public isSatisfiedBy(candidate: AddressAggregate): boolean {
    return Boolean(
      candidate.address.street &&
      candidate.address.city &&
      candidate.address.country &&
      candidate.address.postalCode
    );
  }
}
