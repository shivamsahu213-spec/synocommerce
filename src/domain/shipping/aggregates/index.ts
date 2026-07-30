/**
 * Shipping Domain Aggregate
 *
 * ShipmentAggregate is the consistency boundary for shipment lifecycle transitions.
 * Emits immutable domain events on every successful state change.
 *
 * @module domain/shipping/aggregates
 */

import { AggregateRoot, Address } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import {
  IShipment,
  IShipmentPackage,
  IShippingLabel,
} from '../contracts';
import {
  ShipmentIdentifier,
  CarrierIdentifier,
  TrackingEvent,
  ShippingRate,
} from '../value-objects';
import { ShipmentStatus } from '../types';
import { InvalidShipmentStateError } from '../errors';
import {
  ShipmentCreatedEvent,
  ShipmentPackedEvent,
  ShipmentDispatchedEvent,
  ShipmentDeliveredEvent,
  ShipmentReturnedEvent,
  TrackingUpdatedEvent,
} from '../events';

export class ShipmentAggregate extends AggregateRoot<ShipmentIdentifier> implements IShipment {
  private _status: ShipmentStatus;
  private _packages: IShipmentPackage[];
  private _trackingEvents: TrackingEvent[] = [];
  private _label?: IShippingLabel;
  private _rate?: ShippingRate;

  constructor(
    id: ShipmentIdentifier,
    public readonly orderId: OrderIdentifier,
    public readonly originAddress: Address,
    public readonly destinationAddress: Address,
    public readonly carrierId: CarrierIdentifier,
    packages: readonly IShipmentPackage[] = [],
    public readonly customerId?: string,
    rate?: ShippingRate
  ) {
    super(id);
    this._status = 'DRAFT';
    this._packages = [...packages];
    if (rate !== undefined) {
      this._rate = rate;
    }
    this.addDomainEvent(
      new ShipmentCreatedEvent(id.value, orderId.value)
    );
  }

  public get status(): ShipmentStatus {
    return this._status;
  }

  public get packages(): readonly IShipmentPackage[] {
    return [...this._packages];
  }

  public get trackingEvents(): readonly TrackingEvent[] {
    return [...this._trackingEvents];
  }

  public get label(): IShippingLabel | undefined {
    return this._label;
  }

  public get rate(): ShippingRate | undefined {
    return this._rate;
  }

  public attachLabel(label: IShippingLabel): void {
    if (this._status !== 'DRAFT') {
      throw new InvalidShipmentStateError(
        `Cannot attach label in status '${this._status}'`
      );
    }
    if (this._packages.length === 0) {
      throw new InvalidShipmentStateError('Cannot pack a shipment with no packages');
    }
    this._label = label;
    this._status = 'PACKED';
    this.addDomainEvent(
      new ShipmentPackedEvent(this.id.value, label.labelId.value)
    );
  }

  public dispatch(): void {
    if (this._status !== 'PACKED') {
      throw new InvalidShipmentStateError(
        `Cannot dispatch shipment in status '${this._status}'`
      );
    }
    if (!this._label) {
      throw new InvalidShipmentStateError('Cannot dispatch without a shipping label');
    }
    this._status = 'DISPATCHED';
    this.addDomainEvent(
      new ShipmentDispatchedEvent(
        this.id.value,
        this._label.trackingNumber.value
      )
    );
  }

  public markInTransit(): void {
    if (this._status !== 'DISPATCHED') {
      throw new InvalidShipmentStateError(
        `Cannot mark in-transit from status '${this._status}'`
      );
    }
    this._status = 'IN_TRANSIT';
  }

  public deliver(): void {
    if (this._status !== 'DISPATCHED' && this._status !== 'IN_TRANSIT') {
      throw new InvalidShipmentStateError(
        `Cannot deliver shipment in status '${this._status}'`
      );
    }
    this._status = 'DELIVERED';
    this.addDomainEvent(new ShipmentDeliveredEvent(this.id.value));
  }

  public markReturned(reason: string): void {
    if (
      this._status !== 'DISPATCHED' &&
      this._status !== 'IN_TRANSIT' &&
      this._status !== 'DELIVERED'
    ) {
      throw new InvalidShipmentStateError(
        `Cannot mark returned from status '${this._status}'`
      );
    }
    this._status = 'RETURNED';
    this.addDomainEvent(
      new ShipmentReturnedEvent(this.id.value, reason)
    );
  }

  public addTrackingEvent(event: TrackingEvent): void {
    if (this._status === 'DRAFT') {
      throw new InvalidShipmentStateError(
        'Cannot add tracking events to a draft shipment'
      );
    }
    this._trackingEvents = [...this._trackingEvents, event];
    this.addDomainEvent(
      new TrackingUpdatedEvent(this.id.value, event.status)
    );
  }
}
