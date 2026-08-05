/**
 * Marketing Attribution Engine
 * @module src/modules/analytics/attribution-engine
 */

import { AttributionModel, MarketingAttributionResult } from './types';

export class AttributionEngineProcessor {
  public computeAttribution(
    campaignId: string,
    campaignName: string,
    model: AttributionModel,
    totalOrderAmount: number
  ): MarketingAttributionResult {
    let weight = 1.0;
    if (model === 'FIRST_TOUCH') weight = 1.0;
    else if (model === 'LAST_TOUCH') weight = 1.0;
    else if (model === 'LINEAR') weight = 0.33;
    else if (model === 'POSITION_BASED') weight = 0.40;
    else if (model === 'TIME_DECAY') weight = 0.65;

    return {
      campaignId,
      campaignName,
      model,
      attributedRevenue: Number((totalOrderAmount * weight).toFixed(2)),
      attributedConversions: 1,
    };
  }
}
