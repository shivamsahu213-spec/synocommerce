import { SKU } from '../..';
import { InventoryIdentifier, WarehouseIdentifier, ReservationIdentifier } from '../value-objects';
import { InventoryItemEntity } from '../entities';
import { WarehouseAggregate } from '../aggregates';
import { IInventoryReservation } from '../contracts';

export interface IInventoryRepository {
  findBySkuAndWarehouse(sku: SKU, warehouseId: WarehouseIdentifier): Promise<InventoryItemEntity | null>;
  save(item: InventoryItemEntity): Promise<void>;
}

export interface IWarehouseRepository {
  findById(id: WarehouseIdentifier): Promise<WarehouseAggregate | null>;
  findActiveWarehouses(): Promise<readonly WarehouseAggregate[]>;
  save(warehouse: WarehouseAggregate): Promise<void>;
}

export interface IReservationRepository {
  findById(id: ReservationIdentifier): Promise<IInventoryReservation | null>;
  save(reservation: IInventoryReservation): Promise<void>;
  delete(id: ReservationIdentifier): Promise<void>;
}
