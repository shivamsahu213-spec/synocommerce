/**
 * Fulfillment Domain Contracts
 *
 * Warehouse-neutral interfaces describing the fulfillment model surface.
 * WMS / allocation adapters live outside the domain layer.
 *
 * @module domain/fulfillment/contracts
 */

import { SKU } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import { WarehouseIdentifier } from '../../inventory/value-objects';
import {
  FulfillmentIdentifier,
  FulfillmentStatus,
  WarehouseAssignment,
} from '../value-objects';

/** Discrete pick / pack task within a fulfillment order. */
export interface IFulfillmentTask {
  readonly taskId: string;
  readonly sku: SKU;
  readonly quantity: number;
  readonly warehouseId: WarehouseIdentifier;
  readonly isCompleted: boolean;
}

/** Warehouse pick list grouping fulfillment tasks. */
export interface IPickList {
  readonly pickListId: string;
  readonly warehouseId: WarehouseIdentifier;
  readonly items: readonly IFulfillmentTask[];
}

/** Packing slip generated when items are packed for shipment. */
export interface IPackingSlip {
  readonly packingSlipId: string;
  readonly orderId: OrderIdentifier;
  readonly generatedAt: Date;
}

/** Aggregate root contract for the fulfillment bounded context. */
export interface IFulfillmentOrder {
  readonly id: FulfillmentIdentifier;
  readonly orderId: OrderIdentifier;
  readonly customerId?: string | undefined;
  readonly status: FulfillmentStatus;
  readonly assignments: readonly WarehouseAssignment[];
}
