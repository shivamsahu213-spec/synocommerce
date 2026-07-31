/**
 * Enterprise SaaS Subscriptions, Metering & Invoice Engine
 * @module platform/saas/subscription-metering
 */

export type SaasPlanTier = 'STARTER' | 'PROFESSIONAL' | 'BUSINESS' | 'ENTERPRISE' | 'AGENCY';

export interface SaasPlanLimits {
  maxStores: number;
  maxMonthlyOrders: number;
  customDomainsAllowed: boolean;
  whiteLabeling: boolean;
  monthlyPriceUsd: number;
}

export interface SaasInvoiceRecord {
  invoiceId: string;
  tenantId: string;
  plan: SaasPlanTier;
  baseAmount: number;
  overageAmount: number;
  totalAmount: number;
  issuedAt: Date;
  status: 'PAID' | 'PENDING';
}

export class SaasSubscriptionMeteringEngine {
  private readonly _planDefinitions: Record<SaasPlanTier, SaasPlanLimits> = {
    STARTER: { maxStores: 1, maxMonthlyOrders: 1000, customDomainsAllowed: true, whiteLabeling: false, monthlyPriceUsd: 299 },
    PROFESSIONAL: { maxStores: 5, maxMonthlyOrders: 25000, customDomainsAllowed: true, whiteLabeling: true, monthlyPriceUsd: 999 },
    BUSINESS: { maxStores: 15, maxMonthlyOrders: 100000, customDomainsAllowed: true, whiteLabeling: true, monthlyPriceUsd: 1999 },
    ENTERPRISE: { maxStores: 50, maxMonthlyOrders: 500000, customDomainsAllowed: true, whiteLabeling: true, monthlyPriceUsd: 2999 },
    AGENCY: { maxStores: 200, maxMonthlyOrders: 2500000, customDomainsAllowed: true, whiteLabeling: true, monthlyPriceUsd: 4999 },
  };

  public generateMonthlyInvoice(tenantId: string, plan: SaasPlanTier, monthlyOrdersProcessed: number): SaasInvoiceRecord {
    const def = this._planDefinitions[plan];
    let overageAmount = 0;

    if (monthlyOrdersProcessed > def.maxMonthlyOrders) {
      const overageOrders = monthlyOrdersProcessed - def.maxMonthlyOrders;
      overageAmount = Math.round(overageOrders * 0.08 * 100) / 100; // $0.08 per overage order
    }

    const totalAmount = Math.round((def.monthlyPriceUsd + overageAmount) * 100) / 100;

    return {
      invoiceId: `inv_${tenantId}_${Date.now()}`,
      tenantId,
      plan,
      baseAmount: def.monthlyPriceUsd,
      overageAmount,
      totalAmount,
      issuedAt: new Date(),
      status: 'PAID',
    };
  }
}
