/**
 * Marketplace Catalog & Search Engine
 * @module src/modules/extensions/marketplace-engine
 */

import { ExtensionCategory, MarketplaceListing } from './types';

export class MarketplaceEngineProcessor {
  private listings: MarketplaceListing[] = [
    {
      listingId: 'list_shiprocket',
      pluginId: 'plugin_shiprocket',
      title: 'Shiprocket Multi-Carrier Shipping',
      publisher: 'Shiprocket Inc.',
      category: 'SHIPPING',
      rating: 4.9,
      reviewsCount: 128,
      downloadsCount: 4500,
      priceMonthlyUsd: 29,
      verifiedPublisher: true,
      featured: true,
      trending: true,
      screenshots: ['https://cdn.synocommerce.com/shiprocket-1.png'],
    },
    {
      listingId: 'list_razorpay',
      pluginId: 'plugin_razorpay',
      title: 'Razorpay Payment Gateway Pro',
      publisher: 'Razorpay Software',
      category: 'PAYMENT',
      rating: 4.95,
      reviewsCount: 340,
      downloadsCount: 12000,
      priceMonthlyUsd: 0,
      verifiedPublisher: true,
      featured: true,
      trending: true,
      screenshots: ['https://cdn.synocommerce.com/razorpay-1.png'],
    },
  ];

  public searchListings(query?: string, category?: ExtensionCategory): MarketplaceListing[] {
    return this.listings.filter((item) => {
      const matchQuery = !query || item.title.toLowerCase().includes(query.toLowerCase());
      const matchCategory = !category || item.category === category;
      return matchQuery && matchCategory;
    });
  }

  public publishListing(listing: MarketplaceListing): void {
    this.listings.push(listing);
  }
}
