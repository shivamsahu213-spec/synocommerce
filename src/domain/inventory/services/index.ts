import { SKU } from '../..';
import { ReservationIdentifier,WarehouseIdentifier } from '../value-objects';

export interface IInventoryAllocationResult {
  readonly warehouseId: WarehouseIdentifier;
  readonly allocatedQuantity: number;
}

export interface IInventoryAllocator {
  allocate(sku: SKU, requestedQuantity: number): Promise<readonly IInventoryAllocationResult[]>;
}

export interface IInventoryService {
  reserveStock(sku: SKU, quantity: number, referenceId: string): Promise<ReservationIdentifier>;
  releaseReservation(reservationId: ReservationIdentifier): Promise<void>;
}
