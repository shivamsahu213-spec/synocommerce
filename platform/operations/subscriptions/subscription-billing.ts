/**
 * SaaS Subscriptions & Billing Engine
 * @module platform/operations/subscriptions/subscription-billing
 */

export type SubscriptionPlanTier = 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';

export interface PlanLimits {
  readonly maxStores: number;
  readonly maxMonthlyOrders: number;
  readonly maxApiRequests: number;
  readonly multiRegion: boolean;
}

export interface SubscriptionRecord {
  readonly tenantId: string;
  plan: SubscriptionPlanTier;
  readonly monthlyFee: number;
  ordersThisMonth: number;
  readonly limits: PlanLimits;
}

export class SubscriptionBillingEngine {
  private readonly _subscriptions = new Map<string, SubscriptionRecord>();

  private readonly _planDefinitions: Record<SubscriptionPlanTier, { fee: number; limits: PlanLimits }> = {
    STARTER: { fee: 299, limits: { maxStores: 1, maxMonthlyOrders: 1000, maxApiRequests: 100000, multiRegion: false } },
    PROFESSIONAL: { fee: 999, limits: { maxStores: 5, maxMonthlyOrders: 25000, maxApiRequests: 2500000, multiRegion: true } },
    ENTERPRISE: { fee: 2999, limits: { maxStores: 50, maxMonthlyOrders: 500000, maxApiRequests: 50000000, multiRegion: true } },
  };

  public subscribe(tenantId: string, plan: SubscriptionPlanTier): SubscriptionRecord {
    const def = this._planDefinitions[plan];
    const sub: SubscriptionRecord = {
      tenantId,
      plan,
      monthlyFee: def.fee,
      ordersThisMonth: 0,
      limits: def.limits,
    };
    this._subscriptions.set(tenantId, sub);
    return sub;
  }

  public recordUsage(tenantId: string, orderCount = 1): { overageFee: number } {
    const sub = this._subscriptions.get(tenantId);
    if (!sub) {
      throw new Error(`Subscription not found for tenant '${tenantId}'`);
    }

    sub.ordersThisMonth += orderCount;
    let overageFee = 0;

    if (sub.ordersThisMonth > sub.limits.maxMonthlyOrders) {
      const overageOrders = sub.ordersThisMonth - sub.limits.maxMonthlyOrders;
      overageFee = Math.round(overageOrders * 0.10 * 100) / 100; // $0.10 per overage order
    }

    return { overageFee };
  }
}
