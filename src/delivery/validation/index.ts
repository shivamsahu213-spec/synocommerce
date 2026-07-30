/**
 * Delivery Validation Contracts
 * @module delivery/validation
 */

import { DeliveryRequest } from '../contracts';

export interface IDeliveryRequestValidator<TBody = unknown> {
  validateRequest(request: DeliveryRequest<TBody>): Promise<{ isValid: boolean; errors: readonly string[] }>;
}
