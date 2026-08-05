/**
 * Infrastructure Tax Provider Adapters
 *
 * Implements ITaxPort for Avalara and TaxJar.
 *
 * @module infrastructure/tax/tax-adapters
 */

import { CalculateTaxInput, TaxCalculationDTO } from '../../application/dto';
import { ITaxPort } from '../../application/ports';
import { Result } from '../../application/results';

export class AvalaraTaxAdapter implements ITaxPort {
  public async calculateTax(input: CalculateTaxInput): Promise<Result<TaxCalculationDTO>> {
    const totalAmount = input.items.reduce((sum, item) => sum + item.amount, 0);
    const estimatedTax = totalAmount * 0.18; // 18% tax calculation demo
    return Result.ok<TaxCalculationDTO>({
      totalTax: estimatedTax,
      breakdowns: [
        {
          jurisdiction: input.countryCode,
          rate: 0.18,
          amount: estimatedTax,
        },
      ],
    });
  }
}

export class TaxJarTaxAdapter implements ITaxPort {
  public async calculateTax(input: CalculateTaxInput): Promise<Result<TaxCalculationDTO>> {
    const totalAmount = input.items.reduce((sum, item) => sum + item.amount, 0);
    const estimatedTax = totalAmount * 0.15;
    return Result.ok<TaxCalculationDTO>({
      totalTax: estimatedTax,
      breakdowns: [
        {
          jurisdiction: input.countryCode,
          rate: 0.15,
          amount: estimatedTax,
        },
      ],
    });
  }
}
