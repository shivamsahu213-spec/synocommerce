/**
 * Fulfillment Domain Services (Ports)
 *
 * Interface-only domain / application ports. Concrete WMS / allocation adapters
 * belong in the infrastructure layer.
 *
 * @module domain/fulfillment/services
 */

import { OrderIdentifier } from '../../orders/value-objects';
import { AllocationResult, WarehouseAssignment } from '../value-objects';
import { FulfillmentAggregate } from '../aggregates';

/** Orchestrates end-to-end fulfillment for an order. */
export interface IFulfillmentEngine {
  processFulfillment(orderId: OrderIdentifier): Promise<FulfillmentAggregate>;
}

/** Selects warehouses for order line allocation. */
export interface IWarehouseAssignmentService {
  assignWarehouse(orderId: OrderIdentifier): Promise<readonly WarehouseAssignment[]>;
}

/** Allocates inventory against warehouse capacity / availability. */
export interface IAllocationService {
  allocateItems(orderId: OrderIdentifier): Promise<AllocationResult>;
}
