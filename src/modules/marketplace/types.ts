/**
 * SynoCommerce Enterprise Marketplace Module Types
 * @module src/modules/marketplace/types
 */

export type MarketplaceCategory = 'PAYMENTS' | 'SHIPPING' | 'ANALYTICS' | 'THEMES' | 'MARKETING' | 'AI_TOOLS';

export interface DeveloperPublisher {
  publisherId: string;
  name: string;
  email: string;
  isVerified: boolean;
  publishedAppsCount: number;
}

export interface MarketplacePackageManifest {
  packageId: string;
  name: string;
  version: string;
  category: MarketplaceCategory;
  publisherId: string;
  description: string;
  priceUsd: number; // 0 for FREE
  dependencies?: Record<string, string> | undefined; // e.g. { "syno-core": ">=1.0.0" }
  signatureSha256: string;
}

export interface PackageReview {
  reviewId: string;
  packageId: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  timestamp: Date;
}

export interface InstalledExtension {
  packageId: string;
  installedVersion: string;
  previousVersion?: string | undefined;
  installedAt: Date;
  status: 'ACTIVE' | 'DISABLED';
}
