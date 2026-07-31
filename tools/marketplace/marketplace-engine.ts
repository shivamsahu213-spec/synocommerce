/**
 * Enterprise Plugin & Theme Marketplace Registry Engine
 * @module tools/marketplace/marketplace-engine
 */

import crypto from 'node:crypto';

export type ExtensionCategory = 'THEME' | 'PLUGIN' | 'PAYMENT_ADAPTER' | 'SHIPPING_ADAPTER' | 'CMS_BLOCK';

export interface MarketplacePackage {
  packageId: string;
  name: string;
  version: string;
  category: ExtensionCategory;
  author: string;
  checksum: string;
  isVerified: boolean;
}

export class MarketplaceRegistryEngine {
  private readonly _packages = new Map<string, MarketplacePackage>();

  public registerPackage(pkg: Omit<MarketplacePackage, 'checksum' | 'isVerified'>): MarketplacePackage {
    const checksum = crypto.createHash('sha256').update(`${pkg.packageId}:${pkg.version}`).digest('hex');

    const record: MarketplacePackage = {
      ...pkg,
      checksum,
      isVerified: true,
    };

    this._packages.set(pkg.packageId, record);
    return record;
  }

  public getPackage(packageId: string): MarketplacePackage | undefined {
    return this._packages.get(packageId);
  }
}
