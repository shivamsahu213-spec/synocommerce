/**
 * Shipping Domain Value Objects
 *
 * Carrier-neutral identities, tracking numbers, rate snapshots, and delivery estimates.
 * TrackingNumber is owned by this bounded context (not orders).
 *
 * @module domain/shipping/value-objects
 */

import { Identifier, Money, InvalidValueObjectError } from '../..';

/** Strongly-typed identity for ShipmentAggregate. */
export class ShipmentIdentifier extends Identifier {}

/** Strongly-typed identity for a logistics carrier. */
export class CarrierIdentifier extends Identifier {}

/** Strongly-typed identity for a tracking record. */
export class TrackingIdentifier extends Identifier {}

/** Strongly-typed identity for a shipping label. */
export class LabelIdentifier extends Identifier {}

/**
 * Carrier-issued tracking number. Shipping owns this VO —
 * other contexts store identifier-only string references.
 */
export class TrackingNumber {
  private readonly _value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new InvalidValueObjectError('Tracking number cannot be empty');
    }
    this._value = value.trim();
  }

  public get value(): string {
    return this._value;
  }

  public equals(other?: TrackingNumber): boolean {
    return other ? this._value === other._value : false;
  }

  public toString(): string {
    return this._value;
  }
}

/** Immutable carrier tracking checkpoint. */
export interface TrackingEvent {
  readonly timestamp: Date;
  readonly status: string;
  readonly location?: string;
  readonly description?: string;
}

/** Estimated delivery window for a rate quote. */
export interface DeliveryEstimate {
  readonly estimatedMinDays: number;
  readonly estimatedMaxDays: number;
  readonly estimatedDeliveryDate?: Date;
}

/** Immutable shipping rate quote from a carrier adapter. */
export interface ShippingRate {
  readonly rateId: string;
  readonly carrierId: CarrierIdentifier;
  readonly name: string;
  readonly cost: Money;
  readonly deliveryEstimate: DeliveryEstimate;
}
