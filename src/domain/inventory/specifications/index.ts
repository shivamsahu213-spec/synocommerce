import { CompositeSpecification } from '../..';
import { WarehouseAggregate } from '../aggregates';
import { IInventoryReservation } from '../contracts';
import { InventoryItemEntity } from '../entities';

export class InventoryAvailableSpecification extends CompositeSpecification<InventoryItemEntity> {
  constructor(private readonly requiredQuantity: number) {
    super();
  }
  public isSatisfiedBy(candidate: InventoryItemEntity): boolean {
    return candidate.stockLevel.available >= this.requiredQuantity;
  }
}

export class WarehouseActiveSpecification extends CompositeSpecification<WarehouseAggregate> {
  public isSatisfiedBy(candidate: WarehouseAggregate): boolean {
    return candidate.isActive;
  }
}

export class ReservationValidSpecification extends CompositeSpecification<IInventoryReservation> {
  public isSatisfiedBy(candidate: IInventoryReservation): boolean {
    return candidate.validity.contains(new Date());
  }
}
