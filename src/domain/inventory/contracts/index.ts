import { DateRange,SKU } from '../..';
import { InventoryMovementType, WarehouseType } from '../types';
import { InventoryIdentifier, ReservationIdentifier, StockLevel,WarehouseIdentifier } from '../value-objects';

export interface IInventoryLocation {
  readonly locationId: string;
  readonly code: string;
  readonly name: string;
}

export interface IInventoryReservation {
  readonly id: ReservationIdentifier;
  readonly sku: SKU;
  readonly warehouseId: WarehouseIdentifier;
  readonly quantity: number;
  readonly validity: DateRange;
  readonly referenceId: string;
}

export interface IInventoryMovement {
  readonly movementId: string;
  readonly sku: SKU;
  readonly fromWarehouseId?: WarehouseIdentifier;
  readonly toWarehouseId?: WarehouseIdentifier;
  readonly quantity: number;
  readonly movementType: InventoryMovementType;
  readonly timestamp: Date;
}

export interface IStockAdjustment {
  readonly adjustmentId: string;
  readonly sku: SKU;
  readonly warehouseId: WarehouseIdentifier;
  readonly deltaQuantity: number;
  readonly reason: string;
}

export interface IInventorySnapshot {
  readonly snapshotId: string;
  readonly warehouseId: WarehouseIdentifier;
  readonly sku: SKU;
  readonly stockLevel: StockLevel;
  readonly timestamp: Date;
}

export interface IInventoryItem {
  readonly id: InventoryIdentifier;
  readonly sku: SKU;
  readonly warehouseId: WarehouseIdentifier;
  readonly stockLevel: StockLevel;
}

export interface IWarehouse {
  readonly id: WarehouseIdentifier;
  readonly code: string;
  readonly name: string;
  readonly warehouseType: WarehouseType;
  readonly isActive: boolean;
}
