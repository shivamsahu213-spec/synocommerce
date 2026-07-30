/**
 * Tax Engine Module
 * @module modules/commerce-engine/tax/tax-engine
 */

export interface TaxCalculation {
  readonly taxableAmount: number;
  readonly taxRate: number; // e.g. 0.08 for 8%
  readonly taxAmount: number;
}

export class TaxEngine {
  private readonly _rates = new Map<string, number>([
    ['US-CA', 0.0725],
    ['US-NY', 0.08875],
    ['US-TX', 0.0625],
    ['GB', 0.20], // VAT 20%
    ['DE', 0.19], // VAT 19%
  ]);

  public calculateTax(
    subtotal: number,
    regionCode = 'US-CA',
    isTaxInclusive = false,
    isExempt = false
  ): TaxCalculation {
    if (isExempt) {
      return { taxableAmount: subtotal, taxRate: 0, taxAmount: 0 };
    }

    const rate = this._rates.get(regionCode) ?? 0.08;

    if (isTaxInclusive) {
      const taxAmount = Math.round((subtotal - subtotal / (1 + rate)) * 100) / 100;
      return { taxableAmount: subtotal - taxAmount, taxRate: rate, taxAmount };
    }

    const taxAmount = Math.round((subtotal * rate) * 100) / 100;
    return { taxableAmount: subtotal, taxRate: rate, taxAmount };
  }
}
