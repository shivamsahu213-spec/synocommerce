/**
 * SynoCommerce Enterprise Search & Discovery Engine
 * @module src/modules/search/search-engine
 */

import {
  MerchandisingRule,
  SearchDocument,
  SearchQueryOptions,
  SearchQueryResult,
  SearchResultItem,
} from './types';

export class SynoEnterpriseSearchEngine {
  private index = new Map<string, SearchDocument>();
  private synonyms = new Map<string, string[]>();
  private merchandisingRules = new Map<string, MerchandisingRule>();
  private zeroResultQueries: string[] = [];

  constructor() {
    this.seedDefaultIndex();
    this.seedDefaultSynonyms();
  }

  private seedDefaultIndex(): void {
    const defaultDocs: SearchDocument[] = [
      {
        id: 'prod_triphala_101',
        entityType: 'PRODUCTS',
        title: 'Kalyan Triphala Juice 1L',
        description: 'Pure organic Ayurvedic Triphala juice for digestion & immunity',
        category: 'Juices & Elixirs',
        brand: 'Kalyan Ayurvedic',
        priceUsd: 12.5,
        rating: 4.9,
        inStock: true,
        tags: ['triphala', 'juice', 'ayurvedic', 'digestion'],
      },
      {
        id: 'prod_ashwa_102',
        entityType: 'PRODUCTS',
        title: 'Kalyan Ashwagandha Capsules 60s',
        description: 'Organic Ashwagandha root extract for stress relief',
        category: 'Supplements',
        brand: 'Kalyan Ayurvedic',
        priceUsd: 18.0,
        rating: 4.8,
        inStock: true,
        tags: ['ashwagandha', 'stress', 'capsules', 'energy'],
      },
    ];

    defaultDocs.forEach((doc) => this.index.set(doc.id, doc));
  }

  private seedDefaultSynonyms(): void {
    this.addSynonymGroup(['juice', 'elixir', 'tonic', 'drink']);
    this.addSynonymGroup(['capsules', 'tablets', 'pills']);
  }

  public addSynonymGroup(terms: string[]): void {
    terms.forEach((term) => {
      const lower = term.toLowerCase();
      const existing = this.synonyms.get(lower) || [];
      const combined = Array.from(new Set([...existing, ...terms.map((t) => t.toLowerCase())]));
      this.synonyms.set(lower, combined);
    });
  }

  public indexDocument(doc: SearchDocument): void {
    this.index.set(doc.id, doc);
  }

  public setMerchandisingRule(rule: MerchandisingRule): void {
    this.merchandisingRules.set(rule.queryTrigger.toLowerCase(), rule);
  }

  public calculateLevenshteinDistance(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0]![j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i]![j] = matrix[i - 1]![j - 1]!;
        } else {
          matrix[i]![j] = Math.min(
            matrix[i - 1]![j - 1]! + 1,
            Math.min(matrix[i]![j - 1]! + 1, matrix[i - 1]![j]! + 1)
          );
        }
      }
    }

    return matrix[b.length]![a.length]!;
  }

  public search(opts: SearchQueryOptions): SearchQueryResult {
    const startTime = Date.now();
    const queryLower = opts.query.toLowerCase().trim();
    const rule = this.merchandisingRules.get(queryLower);

    const categoryFacets: Record<string, number> = {};
    const brandFacets: Record<string, number> = {};

    let matchedItems: SearchResultItem[] = [];

    this.index.forEach((doc) => {
      // Build facets
      categoryFacets[doc.category] = (categoryFacets[doc.category] || 0) + 1;
      if (doc.brand) brandFacets[doc.brand] = (brandFacets[doc.brand] || 0) + 1;

      // Filter checks
      if (opts.categoryFilter && doc.category !== opts.categoryFilter) return;
      if (opts.brandFilter && doc.brand !== opts.brandFilter) return;
      if (opts.minPriceUsd && (doc.priceUsd ?? 0) < opts.minPriceUsd) return;
      if (opts.maxPriceUsd && (doc.priceUsd ?? 0) > opts.maxPriceUsd) return;
      if (opts.inStockOnly && !doc.inStock) return;

      // Match scoring
      let score = 0;
      const titleLower = doc.title.toLowerCase();

      if (titleLower.includes(queryLower)) score += 10;

      // Check synonyms
      const syns = this.synonyms.get(queryLower) || [];
      if (syns.some((s) => titleLower.includes(s))) score += 5;

      // Check Levenshtein typo tolerance (distance <= 2)
      if (opts.enableTypoTolerance && score === 0) {
        const words = titleLower.split(' ');
        words.forEach((w) => {
          if (this.calculateLevenshteinDistance(w, queryLower) <= 2) {
            score += 3;
          }
        });
      }

      // Check pinned & boosted rules
      let isPinned = false;
      if (rule) {
        if (rule.pinnedDocumentIds.includes(doc.id)) {
          score += 100;
          isPinned = true;
        }
        if (doc.brand && rule.boostedBrands.includes(doc.brand)) {
          score *= rule.boostFactor;
        }
      }

      if (score > 0) {
        matchedItems.push({ document: doc, score, isPinned });
      }
    });

    // Sort by score descending
    matchedItems.sort((a, b) => b.score - a.score);

    if (matchedItems.length === 0 && queryLower.length > 0) {
      this.zeroResultQueries.push(queryLower);
    }

    return {
      query: opts.query,
      hits: matchedItems,
      totalHits: matchedItems.length,
      processingTimeMs: Date.now() - startTime,
      facets: {
        categories: categoryFacets,
        brands: brandFacets,
      },
    };
  }

  public getZeroResultQueries(): string[] {
    return this.zeroResultQueries;
  }
}
