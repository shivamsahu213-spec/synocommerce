import { taxService, TaxService, TaxCalculationResult } from './tax.service';
import { couponService, CouponService, CouponDiscountResult } from './coupon.service';

export interface LineItemPricingInput {
  productId: string;
  variantId?: string | undefined;
  title: string;
  sku?: string | undefined;
  quantity: number;
  unitPrice: number;
  discountAmount?: number | undefined;
  productMetadata?: any;
}

export interface LineItemPricingOutput {
  productId: string;
  variantId?: string | undefined;
  title: string;
  sku?: string | undefined;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
  taxAmount: number;
  totalPrice: number;
  productMetadata?: any;
}

export interface PricingBreakdownSnapshot {
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  totalAmount: number;
  couponCode?: string | undefined;
  couponId?: string | undefined;
  taxBreakdown: TaxCalculationResult;
  couponBreakdown?: CouponDiscountResult | undefined;
  lineItems: LineItemPricingOutput[];
}

export class PricingService {
  constructor(
    private taxEng: TaxService = taxService,
    private couponEng: CouponService = couponService,
  ) {}

  async calculatePricing(params: {
    tenantId: string;
    storeId?: string | undefined;
    items: LineItemPricingInput[];
    couponCode?: string | undefined;
    shippingAddress: { country: string; region?: string | undefined };
    shippingFee?: number | undefined;
    customerId?: string | undefined;
  }): Promise<PricingBreakdownSnapshot> {
    const { tenantId, storeId, items, couponCode, shippingAddress, customerId } = params;
    let baseShippingFee = params.shippingFee !== undefined ? params.shippingFee : 15.0;

    let subtotal = 0;
    const lineItems: LineItemPricingOutput[] = items.map((item) => {
      const itemSubtotal = item.quantity * item.unitPrice;
      const itemDiscount = item.discountAmount || 0;
      subtotal += itemSubtotal - itemDiscount;

      return {
        productId: item.productId,
        variantId: item.variantId,
        title: item.title,
        sku: item.sku,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discountAmount: itemDiscount,
        taxAmount: 0,
        totalPrice: Math.round((itemSubtotal - itemDiscount) * 100) / 100,
        productMetadata: item.productMetadata,
      };
    });

    subtotal = Math.round(subtotal * 100) / 100;

    let couponBreakdown: CouponDiscountResult | undefined;
    let totalDiscountAmount = items.reduce((sum, i) => sum + (i.discountAmount || 0), 0);

    if (couponCode) {
      couponBreakdown = await this.couponEng.validateAndCalculateCoupon({
        tenantId,
        code: couponCode,
        subtotal,
        shippingFee: baseShippingFee,
        ...(customerId ? { customerId } : {}),
        items: items.map((i) => ({ quantity: i.quantity, unitPrice: i.unitPrice })),
      });

      if (couponBreakdown.isFreeShipping) {
        baseShippingFee = 0;
      }

      totalDiscountAmount += couponBreakdown.discountAmount;
    }

    const netTaxableAmount = Math.max(0, subtotal - (couponBreakdown ? couponBreakdown.discountAmount : 0));

    const taxBreakdown = await this.taxEng.calculateTax({
      tenantId,
      ...(storeId ? { storeId } : {}),
      country: shippingAddress.country,
      ...(shippingAddress.region ? { region: shippingAddress.region } : {}),
      taxableAmount: netTaxableAmount,
    });

    const totalTaxAmount = taxBreakdown.taxAmount;
    lineItems.forEach((item) => {
      const itemRatio = netTaxableAmount > 0 ? item.totalPrice / netTaxableAmount : 0;
      item.taxAmount = Math.round(totalTaxAmount * itemRatio * 100) / 100;
    });

    let totalAmount = 0;
    if (taxBreakdown.isInclusive) {
      totalAmount = netTaxableAmount + baseShippingFee;
    } else {
      totalAmount = netTaxableAmount + baseShippingFee + totalTaxAmount;
    }

    totalAmount = Math.round(totalAmount * 100) / 100;

    return {
      subtotal,
      discountAmount: Math.round(totalDiscountAmount * 100) / 100,
      shippingAmount: Math.round(baseShippingFee * 100) / 100,
      taxAmount: totalTaxAmount,
      totalAmount,
      couponCode: couponBreakdown?.code,
      couponId: couponBreakdown?.couponId,
      taxBreakdown,
      couponBreakdown,
      lineItems,
    };
  }
}

export const pricingService = new PricingService();
