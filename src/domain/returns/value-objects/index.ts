/**
 * Returns Domain Value Objects
 *
 * @module domain/returns/value-objects
 */

import { Address, Identifier, InvalidValueObjectError } from '../..';
import { DEFAULT_RETURN_WINDOW_DAYS } from '../constants';

/** Strongly-typed identity for ReturnAggregate. */
export class ReturnIdentifier extends Identifier {}

/**
 * Canonical return lifecycle status owned by the returns bounded context.
 */
export type ReturnStatus =
  | 'REQUESTED'
  | 'APPROVED'
  | 'REJECTED'
  | 'ITEMS_RECEIVED'
  | 'COMPLETED'
  | 'CANCELLED';

export type ReturnReason =
  | 'DEFECTIVE'
  | 'WRONG_ITEM'
  | 'NOT_AS_DESCRIBED'
  | 'CHANGE_OF_MIND'
  | 'DAMAGED';

/**
 * Immutable RMA authorization snapshot issued on approval.
 */
export interface ReturnAuthorization {
  readonly rmaNumber: string;
  readonly approvedAt: Date;
  readonly returnAddress: Address;
}

/**
 * Eligibility window relative to delivery date.
 */
export class ReturnWindow {
  constructor(public readonly daysAllowed: number = DEFAULT_RETURN_WINDOW_DAYS) {
    if (!Number.isFinite(daysAllowed) || daysAllowed < 0) {
      throw new InvalidValueObjectError(
        'Return window days must be a non-negative finite number'
      );
    }
  }

  public isOpen(deliveredAt: Date, asOf: Date = new Date()): boolean {
    const elapsedDays =
      (asOf.getTime() - deliveredAt.getTime()) / (1000 * 60 * 60 * 24);
    return elapsedDays >= 0 && elapsedDays <= this.daysAllowed;
  }
}
