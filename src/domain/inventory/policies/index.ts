import { IDomainPolicy } from '../..';
import { InventoryItemEntity } from '../entities';

export interface IInventoryPolicy extends IDomainPolicy<InventoryItemEntity> {
  canFulfill(item: InventoryItemEntity, requestedQuantity: number): boolean;
}
