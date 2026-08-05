/**
 * Enterprise Extension & Marketplace Platform Types
 * @module src/modules/extensions/types
 */

export type PluginState = 'INSTALLED' | 'ACTIVE' | 'DISABLED' | 'ERROR';

export type ExtensionCategory =
  | 'PAYMENT'
  | 'SHIPPING'
  | 'TAX'
  | 'MARKETING'
  | 'AI'
  | 'B2B'
  | 'THEME'
  | 'ANALYTICS';

export interface PluginManifest {
  pluginId: string;
  name: string;
  version: string;
  author: string;
  publisher: string;
  license: string;
  description: string;
  category: ExtensionCategory;
  permissions: string[];
  dependencies: Record<string, string>;
  minPlatformVersion: string;
  maxPlatformVersion?: string;
  entryPoint: string;
}

export interface SynoPackage {
  packageId: string;
  manifest: PluginManifest;
  signatureSig: string;
  checksumSha256: string;
  distCode: string;
  iconUrl?: string;
  readme?: string;
}

export interface InstalledPluginRecord {
  pluginId: string;
  version: string;
  state: PluginState;
  installedAt: Date;
  updatedAt: Date;
  previousVersion?: string;
  healthStatus: 'HEALTHY' | 'DEGRADED' | 'FAILED';
}

export interface MarketplaceListing {
  listingId: string;
  pluginId: string;
  title: string;
  publisher: string;
  category: ExtensionCategory;
  rating: number;
  reviewsCount: number;
  downloadsCount: number;
  priceMonthlyUsd: number;
  verifiedPublisher: boolean;
  featured: boolean;
  trending: boolean;
  screenshots: string[];
}

export interface PublisherAppSubmission {
  publisherId: string;
  pkg: SynoPackage;
  priceMonthlyUsd: number;
  supportEmail: string;
  privacyPolicyUrl: string;
  documentationUrl: string;
}

export interface AppSubscriptionBilling {
  subscriptionId: string;
  tenantId: string;
  pluginId: string;
  priceMonthlyUsd: number;
  revenueSharePublisherUsd: number;
  revenueSharePlatformUsd: number;
  status: 'ACTIVE' | 'CANCELLED';
}
