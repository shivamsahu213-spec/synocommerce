/**
 * Recommendation Engine Module
 * @module modules/commerce-engine/recommendations/recommendation-engine
 */

import { SearchProductDoc } from '../search';

export class RecommendationEngine {
  private readonly _catalog: SearchProductDoc[] = [];
  private readonly _recentlyViewed = new Map<string, string[]>(); // userId -> productIds

  public setCatalog(docs: readonly SearchProductDoc[]): void {
    this._catalog.length = 0;
    this._catalog.push(...docs);
  }

  public recordView(userId: string, productId: string): void {
    const list = this._recentlyViewed.get(userId) || [];
    const updated = [productId, ...list.filter((id) => id !== productId)].slice(0, 10);
    this._recentlyViewed.set(userId, updated);
  }

  public getRelatedProducts(category: string, currentProductId: string, limit = 4): readonly SearchProductDoc[] {
    return this._catalog
      .filter((p) => p.category === category && p.id !== currentProductId)
      .slice(0, limit);
  }

  public getRecentlyViewed(userId: string): readonly SearchProductDoc[] {
    const ids = this._recentlyViewed.get(userId) || [];
    return ids.map((id) => this._catalog.find((p) => p.id === id)).filter((p): p is SearchProductDoc => p !== undefined);
  }
}
