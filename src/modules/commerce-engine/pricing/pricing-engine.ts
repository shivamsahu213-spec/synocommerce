/**
 * Pricing Engine Module
 *
 * Implements Price Books, Customer Group Pricing, Tier/Volume Pricing, Sale Prices, and Currency Conversions.
 *
 * @module modules/commerce-engine/pricing/pricing-engine
 */

export interface PriceTier {
  readonly minQuantity: number;
  readonly unitPrice: number;
}

export interface ProductPrice {
  readonly sku: string;
  readonly basePrice: number;
  readonly salePrice?: number | undefined;
  readonly currency: string;
  readonly tiers?: readonly PriceTier[] | undefined;
  readonly isTaxInclusive?: boolean | undefined;
}

export interface CustomerPricingRule {
  readonly customerGroup: string;
  readonly discountPercentage: number;
}

export class PricingEngine {
  private readonly _priceBook = new Map<string, ProductPrice>();
  private readonly _exchangeRates = new Map<string, number>();

  constructor() {
    // Default USD base rate
    this._exchangeRates.set('USD', 1.0);
    this._exchangeRates.set('EUR', 0.92);
    this._exchangeRates.set('GBP', 0.78);
    this._exchangeRates.set('CAD', 1.35);
  }

  public setProductPrice(price: ProductPrice): void {
    this._priceBook.set(price.sku, price);
  }

  public getProductPrice(sku: string): ProductPrice | undefined {
    return this._priceBook.get(sku);
  }

  public calculateUnitPrice(
    sku: string,
    quantity: number,
    targetCurrency = 'USD',
    customerGroup?: string
  ): { unitPrice: number; totalPrice: number; currency: string; isTaxInclusive: boolean } {
    const productPrice = this._priceBook.get(sku);
    if (!productPrice) {
      throw new Error(`Price not found for SKU: ${sku}`);
    }

    let price = productPrice.salePrice !== undefined && productPrice.salePrice < productPrice.basePrice
      ? productPrice.salePrice
      : productPrice.basePrice;

    // Apply Tier / Volume Pricing if applicable
    if (productPrice.tiers && productPrice.tiers.length > 0) {
      const sortedTiers = [...productPrice.tiers].sort((a, b) => b.minQuantity - a.minQuantity);
      for (const tier of sortedTiers) {
        if (quantity >= tier.minQuantity) {
          price = tier.unitPrice;
          break;
        }
      }
    }

    // Apply Currency Exchange Rate
    const rate = this._exchangeRates.get(targetCurrency) ?? 1.0;
    const baseRate = this._exchangeRates.get(productPrice.currency) ?? 1.0;
    const convertedUnitPrice = (price / baseRate) * rate;

    // Round to 2 decimal places
    const finalUnitPrice = Math.round(convertedUnitPrice * 100) / 100;
    const totalPrice = Math.round(finalUnitPrice * quantity * 100) / 100;

    return {
      unitPrice: finalUnitPrice,
      totalPrice,
      currency: targetCurrency,
      isTaxInclusive: productPrice.isTaxInclusive ?? false,
    };
  }
}
