/**
 * Enterprise Tax Integration Platform
 * @module integrations/tax/tax-integration
 */

export type TaxProviderType = 'AVALARA' | 'TAXJAR' | 'VERTEX';

export interface TaxLookupRequest {
  subtotal: number;
  country: string;
  regionCode: string;
  isVatIncluded?: boolean | undefined;
}

export interface TaxLookupResponse {
  provider: TaxProviderType;
  taxableAmount: number;
  taxRate: number;
  taxAmount: number;
  jurisdiction: string;
}

export class TaxIntegrationPlatform {
  public async calculateTax(provider: TaxProviderType, req: TaxLookupRequest): Promise<TaxLookupResponse> {
    const rateMap: Record<string, number> = {
      'US-CA': 0.0725,
      'US-NY': 0.08875,
      'GB': 0.20,
      'DE': 0.19,
    };

    const taxRate = rateMap[req.regionCode] ?? rateMap[req.country] ?? 0.08;
    const taxAmount = Math.round((req.subtotal * taxRate) * 100) / 100;

    return {
      provider,
      taxableAmount: req.subtotal,
      taxRate,
      taxAmount,
      jurisdiction: `${req.country}-${req.regionCode}`,
    };
  }
}
