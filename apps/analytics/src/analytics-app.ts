/**
 * Analytics Portal Application Controller
 * @module apps/analytics/src/analytics-app
 */

import { SynoBusinessIntelligenceEngine } from '@business-intelligence/bi-engine';

export class AnalyticsAppController {
  private biEngine: SynoBusinessIntelligenceEngine;

  constructor() {
    this.biEngine = new SynoBusinessIntelligenceEngine();
  }

  public getBiEngine(): SynoBusinessIntelligenceEngine {
    return this.biEngine;
  }
}
