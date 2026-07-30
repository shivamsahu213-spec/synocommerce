/**
 * Shipping Domain Types
 *
 * @module domain/shipping/types
 */

/** Canonical shipment lifecycle status owned by the shipping bounded context. */
export type ShipmentStatus =
  | 'DRAFT'
  | 'PACKED'
  | 'DISPATCHED'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'RETURNED'
  | 'FAILED';
