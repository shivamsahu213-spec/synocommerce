import { prisma } from '../../../database/prisma';
import { TaxType } from '@prisma/client';

export interface TaxCalculationResult {
  taxName: string;
  taxType: TaxType;
  rate: number;
  isInclusive: boolean;
  taxAmount: number;
}

export class TaxService {
  /**
   * Calculate tax based on store, destination country, region, and taxable amount.
   */
  async calculateTax(params: {
    tenantId: string;
    storeId?: string;
    country: string;
    region?: string;
    taxableAmount: number;
  }): Promise<TaxCalculationResult> {
    const { tenantId, storeId, country, region, taxableAmount } = params;

    // Attempt to match store & country & region tax rule first
    let rule = await prisma.taxRule.findFirst({
      where: {
        tenantId,
        ...(storeId ? { storeId } : {}),
        country: country.toUpperCase(),
        ...(region ? { region: region.toUpperCase() } : {}),
      },
    });

    // Fallback: match country level rule
    if (!rule) {
      rule = await prisma.taxRule.findFirst({
        where: {
          tenantId,
          country: country.toUpperCase(),
          region: null,
        },
      });
    }

    // Default fallback rules based on country standard
    const rate = rule ? Number(rule.rate) : country.toUpperCase() === 'IN' ? 0.18 : country.toUpperCase() === 'GB' ? 0.20 : 0.08;
    const isInclusive = rule ? rule.isInclusive : false;
    const taxName = rule ? rule.name : country.toUpperCase() === 'IN' ? 'GST (18%)' : country.toUpperCase() === 'GB' ? 'VAT (20%)' : 'Sales Tax (8%)';
    const taxType: TaxType = rule ? rule.type : country.toUpperCase() === 'IN' ? TaxType.GST : country.toUpperCase() === 'GB' ? TaxType.VAT : TaxType.SALES_TAX;

    let taxAmount = 0;
    if (isInclusive) {
      // Amount includes tax: taxAmount = amount - (amount / (1 + rate))
      taxAmount = taxableAmount - taxableAmount / (1 + rate);
    } else {
      // Amount excludes tax: taxAmount = amount * rate
      taxAmount = taxableAmount * rate;
    }

    return {
      taxName,
      taxType,
      rate,
      isInclusive,
      taxAmount: Math.round(taxAmount * 100) / 100,
    };
  }
}

export const taxService = new TaxService();
