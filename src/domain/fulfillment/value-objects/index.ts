/**
 * Fulfillment Domain Value Objects
 *
 * Warehouse assignment snapshots and fulfillment lifecycle status.
 *
 * @module domain/fulfillment/value-objects
 */

import { Identifier, SKU } from '../..';
import { WarehouseIdentifier } from '../../inventory/value-objects';

/** Strongly-typed identity for FulfillmentAggregate. */
export class FulfillmentIdentifier extends Identifier {}

/**
 * Canonical fulfillment lifecycle status owned by the fulfillment bounded context.
 */
export type FulfillmentStatus =
  | 'CREATED'
  | 'ALLOCATED'
  | 'PICKING'
  | 'PACKED'
  | 'SHIPPED'
  | 'COMPLETED'
  | 'CANCELLED';

/** Immutable warehouse stock assignment for a fulfillment line. */
export interface WarehouseAssignment {
  readonly warehouseId: WarehouseIdentifier;
  readonly allocatedQuantity: number;
  readonly sku?: SKU;
}

/** Result of running allocation across one or more warehouses. */
export interface AllocationResult {
  readonly isFullyAllocated: boolean;
  readonly assignments: readonly WarehouseAssignment[];
}
