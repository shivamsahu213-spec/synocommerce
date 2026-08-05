/**
 * Marketplace Portal Application Types
 * @module apps/marketplace/src/types
 */

export type MarketplacePortalTab = 'FEATURED' | 'PAYMENTS' | 'SHIPPING' | 'THEMES' | 'MY_INSTALLED_APPS';

export interface MarketplaceAppFilter {
  searchQuery?: string | undefined;
  category?: string | undefined;
  minRating?: number | undefined;
}
