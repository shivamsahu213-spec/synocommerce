/**
 * Shipping Domain Errors
 *
 * @module domain/shipping/errors
 */

import { DomainError } from '../..';

export class ShippingError extends DomainError {
  constructor(message: string, code: string = 'SHIPPING_ERROR') {
    super(message, code);
  }
}

export class InvalidPackageDimensionsError extends ShippingError {
  constructor(reason: string) {
    super(`Invalid package dimensions or weight: ${reason}`, 'INVALID_PACKAGE_DIMENSIONS');
  }
}

export class InvalidShipmentStateError extends ShippingError {
  constructor(reason: string) {
    super(`Invalid shipment state transition: ${reason}`, 'INVALID_SHIPMENT_STATE');
  }
}
