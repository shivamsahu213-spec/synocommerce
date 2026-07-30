/**
 * Shipping Domain Specifications
 *
 * @module domain/shipping/specifications
 */

import { CompositeSpecification } from '../..';
import { ShipmentAggregate } from '../aggregates';
import { IShipmentPackage } from '../contracts';

export class ShipmentReadySpecification extends CompositeSpecification<ShipmentAggregate> {
  public isSatisfiedBy(candidate: ShipmentAggregate): boolean {
    return candidate.status === 'PACKED' && candidate.label !== undefined;
  }
}

export class ShippingAllowedSpecification extends CompositeSpecification<ShipmentAggregate> {
  public isSatisfiedBy(candidate: ShipmentAggregate): boolean {
    return candidate.status === 'DRAFT' && candidate.packages.length > 0;
  }
}

export class PackageValidSpecification extends CompositeSpecification<IShipmentPackage> {
  public isSatisfiedBy(candidate: IShipmentPackage): boolean {
    return (
      candidate.weight.value > 0 &&
      candidate.dimension.volume > 0 &&
      candidate.items.length > 0
    );
  }
}
