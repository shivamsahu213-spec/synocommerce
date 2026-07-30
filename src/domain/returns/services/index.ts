/**
 * Returns Domain Services (Ports)
 *
 * Interface-only domain / application ports. Concrete adapters belong
 * in the infrastructure layer.
 *
 * @module domain/returns/services
 */

import { OrderIdentifier } from '../../orders/value-objects';
import { ReturnAggregate } from '../aggregates';
import { ReturnAuthorization, ReturnIdentifier } from '../value-objects';

/** Validates return eligibility against order/delivery context. */
export interface IReturnValidationService {
  validateReturnEligibility(orderId: OrderIdentifier): Promise<boolean>;
}

/** Issues RMA authorizations for approved returns. */
export interface IRMAService {
  generateRMA(returnId: ReturnIdentifier): Promise<ReturnAuthorization>;
  authorizeReturn(returnRequest: ReturnAggregate): Promise<ReturnAuthorization>;
}
