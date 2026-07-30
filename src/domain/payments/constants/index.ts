/**
 * Payments Domain Constants
 *
 * @module domain/payments/constants
 */

import { PaymentStatus } from '../value-objects';

export const MAX_PAYMENT_RETRIES = 3;

export const DEFAULT_PAYMENT_STATUS: PaymentStatus = 'PENDING';

/** Default authorization hold expiry in hours. */
export const DEFAULT_AUTH_EXPIRY_HOURS = 168;
