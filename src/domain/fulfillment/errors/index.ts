/**
 * Fulfillment Domain Errors
 *
 * @module domain/fulfillment/errors
 */

import { DomainError } from '../..';

export class FulfillmentError extends DomainError {
  constructor(message: string, code: string = 'FULFILLMENT_ERROR') {
    super(message, code);
  }
}

export class AllocationFailedError extends FulfillmentError {
  constructor(reason: string) {
    super(`Fulfillment warehouse allocation failed: ${reason}`, 'ALLOCATION_FAILED');
  }
}

export class InvalidFulfillmentStateError extends FulfillmentError {
  constructor(reason: string) {
    super(`Invalid fulfillment state transition: ${reason}`, 'INVALID_FULFILLMENT_STATE');
  }
}
