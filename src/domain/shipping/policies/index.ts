/**
 * Shipping Domain Policies
 *
 * @module domain/shipping/policies
 */

import { IDomainPolicy } from '../..';
import { ShipmentAggregate } from '../aggregates';
import { IShipmentPackage } from '../contracts';

export interface IShippingPolicy extends IDomainPolicy<ShipmentAggregate> {
  canShip(shipment: ShipmentAggregate): boolean;
  canDispatch(shipment: ShipmentAggregate): boolean;
}

export interface IPackagingPolicy extends IDomainPolicy<IShipmentPackage> {
  isValidPackage(pkg: IShipmentPackage): boolean;
}

export interface IDeliveryPolicy extends IDomainPolicy<ShipmentAggregate> {
  isDeliveryOnSchedule(shipment: ShipmentAggregate): boolean;
}
