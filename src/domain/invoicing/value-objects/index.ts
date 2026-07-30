/**
 * Invoicing Domain Value Objects
 *
 * @module domain/invoicing/value-objects
 */

import { Identifier, Money, InvalidValueObjectError } from '../..';

/** Strongly-typed identity for InvoiceAggregate. */
export class InvoiceIdentifier extends Identifier {}

/**
 * Canonical, non-empty, uppercase invoice number.
 */
export class InvoiceNumber {
  private readonly _value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new InvalidValueObjectError('Invoice number cannot be empty');
    }
    this._value = value.trim().toUpperCase();
  }

  public get value(): string {
    return this._value;
  }

  public equals(other?: InvoiceNumber): boolean {
    return other ? this._value === other._value : false;
  }

  public toString(): string {
    return this._value;
  }
}

/**
 * Canonical invoice lifecycle status owned by the invoicing bounded context.
 */
export type InvoiceStatus =
  | 'DRAFT'
  | 'ISSUED'
  | 'PAID'
  | 'VOID'
  | 'CANCELLED';

/**
 * Immutable monetary totals snapshot for an invoice.
 */
export interface InvoiceTotals {
  readonly subtotal: Money;
  readonly taxTotal: Money;
  readonly grandTotal: Money;
}
