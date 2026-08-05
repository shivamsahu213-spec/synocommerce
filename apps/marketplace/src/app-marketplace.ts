/**
 * Storefront Marketplace Application Controller
 * @module apps/marketplace/src/app-marketplace
 */

import { SynoMarketplaceEngine } from '@marketplace/marketplace-engine';

export class AppMarketplaceController {
  private engine: SynoMarketplaceEngine;

  constructor() {
    this.engine = new SynoMarketplaceEngine();
  }

  public getEngine(): SynoMarketplaceEngine {
    return this.engine;
  }
}
