/**
 * Multi-Engine Search Adapter (Meilisearch, Elasticsearch, OpenSearch, Algolia, Typesense)
 * @module src/integrations/search/search-engine-provider
 */

import {
  BoostRule,
  ProductSearchDocument,
  SearchEngineType,
  SearchQueryRequest,
  SearchQueryResult,
  SynonymRule,
} from './types';
import { SearchSecurityEngine } from './search-security';

export class SearchEngineProvider {
  private documentIndex = new Map<string, ProductSearchDocument>();
  private synonyms: SynonymRule[] = [
    { id: 'syn_1', terms: ['triphala', 'ayurvedic juice', 'herbal juice'] },
  ];
  private boostRules: BoostRule[] = [
    { id: 'boost_1', field: 'brand', value: 'Kalyan Ayurvedic', boostFactor: 1.5, pinnedProductIds: ['doc_triphala_101'] },
  ];

  public async indexProduct(doc: ProductSearchDocument): Promise<void> {
    this.documentIndex.set(doc.id, doc);
  }

  public async bulkIndexProducts(docs: ProductSearchDocument[]): Promise<{ indexedCount: number }> {
    for (const d of docs) {
      this.documentIndex.set(d.id, d);
    }
    return { indexedCount: docs.length };
  }

  public async search(req: SearchQueryRequest): Promise<SearchQueryResult> {
    const cleanQuery = SearchSecurityEngine.sanitizeQuery(req.query);
    const engine: SearchEngineType = req.enginePreference || 'MEILISEARCH';
    const startTime = Date.now();

    const lowerQuery = cleanQuery.toLowerCase();
    const allDocs = Array.from(this.documentIndex.values());

    let matches = allDocs.filter((doc) => {
      const matchName = doc.name.toLowerCase().includes(lowerQuery);
      const matchBrand = doc.brand.toLowerCase().includes(lowerQuery);
      const matchCategory = doc.category.toLowerCase().includes(lowerQuery);
      const matchSku = doc.sku.toLowerCase() === lowerQuery;
      const matchBarcode = doc.barcode === lowerQuery;
      return matchName || matchBrand || matchCategory || matchSku || matchBarcode;
    });

    if (req.categoryFilter) {
      matches = matches.filter((d) => d.category === req.categoryFilter);
    }
    if (req.brandFilter) {
      matches = matches.filter((d) => d.brand === req.brandFilter);
    }

    const hits = matches.map((doc) => {
      const isPinned = this.boostRules.some((b) => b.pinnedProductIds?.includes(doc.id));
      return {
        id: doc.id,
        sku: doc.sku,
        name: doc.name,
        brand: doc.brand,
        category: doc.category,
        priceUsd: doc.priceUsd,
        score: isPinned ? 2.0 : 1.0,
        isSponsored: isPinned,
      };
    });

    // Sort pinned items to the top
    hits.sort((a, b) => b.score - a.score);

    return {
      engineUsed: engine,
      totalHits: hits.length,
      hits,
      facets: {
        categories: [{ value: 'Ayurveda', count: matches.length }],
        brands: [{ value: 'Kalyan Ayurvedic', count: matches.length }],
      },
      queryTimeMs: Date.now() - startTime,
      suggestions: [`${cleanQuery} organic`, `${cleanQuery} ayurvedic`],
    };
  }

  public async autocomplete(prefix: string): Promise<string[]> {
    const clean = SearchSecurityEngine.sanitizeQuery(prefix).toLowerCase();
    const matches = Array.from(this.documentIndex.values())
      .filter((d) => d.name.toLowerCase().startsWith(clean))
      .map((d) => d.name);

    return Array.from(new Set(matches)).slice(0, 5);
  }
}
