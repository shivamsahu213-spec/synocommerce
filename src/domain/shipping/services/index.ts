/**
 * Shipping Domain Services (Ports)
 *
 * Interface-only domain / application ports. Concrete carrier adapters belong
 * in the infrastructure layer and must remain vendor-neutral at this boundary.
 *
 * @module domain/shipping/services
 */

import { Address } from '../..';
import { IShipmentPackage, IShippingLabel } from '../contracts';
import { ShippingRate, TrackingEvent, TrackingNumber } from '../value-objects';

/**
 * Vendor-neutral rate calculation port.
 * FedEx / UPS / DHL / custom adapters implement this outside the domain.
 */
export interface IShippingCalculator {
  calculateRates(
    origin: Address,
    destination: Address,
    packages: readonly IShipmentPackage[]
  ): Promise<readonly ShippingRate[]>;
}

/** Creates carrier shipments without leaking provider SDKs into the domain. */
export interface IShippingProvider {
  createShipment(packages: readonly IShipmentPackage[]): Promise<string>;
}

/** Generates printable / digital shipping labels. */
export interface ILabelGenerator {
  generateLabel(shipmentId: string): Promise<IShippingLabel>;
}

/** Fetches carrier tracking checkpoints for a tracking number. */
export interface ITrackingService {
  fetchTrackingEvents(trackingNumber: TrackingNumber): Promise<readonly TrackingEvent[]>;
}
