/**
 * Shipping Domain Constants
 *
 * @module domain/shipping/constants
 */

import { ShipmentStatus } from '../types';

/** Default carrier code when none is explicitly selected. */
export const DEFAULT_SHIPPING_CARRIER = 'STANDARD_LOGISTICS';

export const DEFAULT_SHIPMENT_STATUS: ShipmentStatus = 'DRAFT';

/** Soft upper bound for packages per shipment before policy review. */
export const MAX_PACKAGES_PER_SHIPMENT = 50;
