/**
 * Shipping Domain Contracts
 *
 * Carrier-neutral interfaces describing the shipping model surface.
 * Carrier SDK adapters live outside the domain layer.
 *
 * @module domain/shipping/contracts
 */

import { Address, Dimension,SKU, Weight } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import { ShipmentStatus } from '../types';
import {
  CarrierIdentifier,
  LabelIdentifier,
  ShipmentIdentifier,
  ShippingRate,
  TrackingEvent,
  TrackingNumber,
} from '../value-objects';

/** Line item packed into a shipment package. */
export interface IShipmentItem {
  readonly sku: SKU;
  readonly quantity: number;
}

/** Physical package with weight, dimensions, and contained items. */
export interface IShipmentPackage {
  readonly packageId: string;
  readonly weight: Weight;
  readonly dimension: Dimension;
  readonly items: readonly IShipmentItem[];
}

/** Carrier shipping label with tracking. */
export interface IShippingLabel {
  readonly labelId: LabelIdentifier;
  readonly labelUrl: string;
  readonly trackingNumber: TrackingNumber;
}

/** Selectable shipping method offered at checkout / fulfillment. */
export interface IShippingMethod {
  readonly id: string;
  readonly name: string;
  readonly carrierId: CarrierIdentifier;
}

/** Geographic zone used for rate / method eligibility. */
export interface IShippingZone {
  readonly zoneId: string;
  readonly countryCodes: readonly string[];
  readonly stateCodes?: readonly string[];
}

/** Contract alias for the ShippingRate value object. */
export type IShippingRate = ShippingRate;

/** Vendor-neutral carrier capability descriptor. */
export interface ICarrier {
  readonly id: CarrierIdentifier;
  readonly name: string;
  readonly code: string;
}

/** Aggregate root contract for the shipping bounded context. */
export interface IShipment {
  readonly id: ShipmentIdentifier;
  readonly orderId: OrderIdentifier;
  readonly customerId?: string | undefined;
  readonly originAddress: Address;
  readonly destinationAddress: Address;
  readonly carrierId: CarrierIdentifier;
  readonly status: ShipmentStatus;
  readonly packages: readonly IShipmentPackage[];
  readonly trackingEvents: readonly TrackingEvent[];
  readonly label?: IShippingLabel | undefined;
  readonly rate?: ShippingRate | undefined;
}
