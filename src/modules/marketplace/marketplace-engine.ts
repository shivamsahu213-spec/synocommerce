/**
 * SynoCommerce Enterprise Marketplace Engine
 * @module src/modules/marketplace/marketplace-engine
 */

import crypto from 'node:crypto';
import {
  DeveloperPublisher,
  InstalledExtension,
  MarketplacePackageManifest,
  PackageReview,
} from './types';

export class SynoMarketplaceEngine {
  private listings = new Map<string, MarketplacePackageManifest>();
  private installedExtensions = new Map<string, InstalledExtension>();
  private publishers = new Map<string, DeveloperPublisher>();
  private reviews: PackageReview[] = [];

  constructor() {
    this.seedDefaultListings();
  }

  private seedDefaultListings(): void {
    const pub: DeveloperPublisher = {
      publisherId: 'pub_kalyan_01',
      name: 'Kalyan Software Labs',
      email: 'dev@kalyanlab.com',
      isVerified: true,
      publishedAppsCount: 3,
    };
    this.publishers.set(pub.publisherId, pub);

    const pkg: MarketplacePackageManifest = {
      packageId: 'ext_razorpay_pro',
      name: 'Razorpay Enterprise Payment Gateway',
      version: '1.4.0',
      category: 'PAYMENTS',
      publisherId: pub.publisherId,
      description: 'Razorpay UPI, Credit Card, and Instant Refund plugin',
      priceUsd: 49.0,
      signatureSha256: crypto.createHash('sha256').update('ext_razorpay_pro_v1.4.0').digest('hex'),
    };
    this.listings.set(pkg.packageId, pkg);
  }

  public verifyDigitalSignature(packageId: string, payload: string, signature: string): boolean {
    const expected = crypto.createHash('sha256').update(payload).digest('hex');
    return expected === signature;
  }

  public scanForMalware(payload: string): { clean: boolean; threatsDetected: string[] } {
    if (payload.includes('EICAR_TEST_FILE') || payload.includes('eval(')) {
      return { clean: false, threatsDetected: ['SUSPICIOUS_EVAL_EXECUTION'] };
    }
    return { clean: true, threatsDetected: [] };
  }

  public resolveDependencies(manifest: MarketplacePackageManifest): { satisfied: boolean; missing: string[] } {
    if (!manifest.dependencies) return { satisfied: true, missing: [] };
    return { satisfied: true, missing: [] };
  }

  public installExtension(packageId: string): InstalledExtension {
    const listing = this.listings.get(packageId);
    if (!listing) throw new Error('PACKAGE_NOT_FOUND');

    const ext: InstalledExtension = {
      packageId: listing.packageId,
      installedVersion: listing.version,
      installedAt: new Date(),
      status: 'ACTIVE',
    };
    this.installedExtensions.set(packageId, ext);
    return ext;
  }

  public updateExtension(packageId: string, newVersion: string): InstalledExtension {
    const existing = this.installedExtensions.get(packageId);
    if (!existing) throw new Error('EXTENSION_NOT_INSTALLED');

    existing.previousVersion = existing.installedVersion;
    existing.installedVersion = newVersion;
    return existing;
  }

  public rollbackExtension(packageId: string): InstalledExtension {
    const existing = this.installedExtensions.get(packageId);
    if (!existing || !existing.previousVersion) throw new Error('NO_PREVIOUS_VERSION_TO_ROLLBACK');

    const temp = existing.installedVersion;
    existing.installedVersion = existing.previousVersion;
    existing.previousVersion = temp;
    return existing;
  }

  public removeExtension(packageId: string): boolean {
    return this.installedExtensions.delete(packageId);
  }

  public submitReview(packageId: string, author: string, rating: number, comment: string): PackageReview {
    const review: PackageReview = {
      reviewId: `rev_${Date.now()}`,
      packageId,
      author,
      rating,
      comment,
      timestamp: new Date(),
    };
    this.reviews.push(review);
    return review;
  }

  public calculatePublisherPayout(grossSalesUsd: number): { publisherShareUsd: number; platformFeeUsd: number } {
    const platformFeeUsd = Number((grossSalesUsd * 0.2).toFixed(2)); // 20% platform commission
    const publisherShareUsd = Number((grossSalesUsd * 0.8).toFixed(2)); // 80% developer payout
    return { publisherShareUsd, platformFeeUsd };
  }

  public getListings(): MarketplacePackageManifest[] {
    return Array.from(this.listings.values());
  }

  public getInstalledExtensions(): InstalledExtension[] {
    return Array.from(this.installedExtensions.values());
  }
}
