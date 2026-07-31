/**
 * Unified Customer Loyalty Profile & Rewards Engine
 * @module modules/omnichannel/loyalty-engine
 */

import { LoyaltyAccountRecord } from './types';

export class UnifiedLoyaltyEngine {
  private readonly _loyaltyAccounts = new Map<string, LoyaltyAccountRecord>();

  public getOrCreateLoyaltyProfile(customerId: string): LoyaltyAccountRecord {
    let profile = this._loyaltyAccounts.get(customerId);
    if (!profile) {
      profile = {
        customerId,
        pointsBalance: 0,
        tier: 'BRONZE',
        storeCreditInr: 0,
      };
      this._loyaltyAccounts.set(customerId, profile);
    }
    return profile;
  }

  public awardPurchasePoints(customerId: string, orderAmountInr: number): LoyaltyAccountRecord {
    const profile = this.getOrCreateLoyaltyProfile(customerId);
    const earnedPoints = Math.floor(orderAmountInr / 10); // 1 point per ₹10 spent
    profile.pointsBalance += earnedPoints;

    if (profile.pointsBalance >= 5000) {
      profile.tier = 'PLATINUM';
    } else if (profile.pointsBalance >= 2000) {
      profile.tier = 'GOLD';
    } else if (profile.pointsBalance >= 500) {
      profile.tier = 'SILVER';
    }

    return profile;
  }
}
