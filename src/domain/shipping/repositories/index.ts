/**
 * Shipping Domain Repository Contracts
 *
 * @module domain/shipping/repositories
 */

import { IBaseRepository } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import { ShipmentAggregate } from '../aggregates';
import { IShippingZone } from '../contracts';
import { ShipmentIdentifier, TrackingNumber } from '../value-objects';

export interface IShipmentRepository extends IBaseRepository<ShipmentAggregate, ShipmentIdentifier> {
  findByOrderId(orderId: OrderIdentifier): Promise<readonly ShipmentAggregate[]>;
  findByTrackingNumber(trackingNumber: TrackingNumber): Promise<ShipmentAggregate | null>;
}

export interface IShippingZoneRepository {
  findZoneForCountry(countryCode: string): Promise<IShippingZone | null>;
  findAll(): Promise<readonly IShippingZone[]>;
}
