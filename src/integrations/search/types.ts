/**
 * Enterprise Search & Discovery Platform Types
 * @module src/integrations/search/types
 */

export type SearchEngineType = 'MEILISEARCH' | 'ELASTICSEARCH' | 'OPENSEARCH' | 'ALGOLIA' | 'TYPESENSE';

export interface ProductSearchDocument {
  id: string;
  sku: string;
  barcode?: string | undefined;
  name: string;
  description: string;
  brand: string;
  category: string;
  categories: string[];
  priceUsd: number;
  inStock: boolean;
  rating: number;
  tags: string[];
  embeddingVector?: number[] | undefined;
  updatedAt: number;
}

export interface SearchQueryRequest {
  query: string;
  enginePreference?: SearchEngineType | undefined;
  categoryFilter?: string | undefined;
  brandFilter?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  inStockOnly?: boolean | undefined;
  page?: number | undefined;
  limit?: number | undefined;
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'rating' | undefined;
  enableFuzzy?: boolean | undefined;
  enableSemantic?: boolean | undefined;
}

export interface SearchResultItem {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  priceUsd: number;
  score: number;
  highlightedName?: string | undefined;
  isSponsored?: boolean | undefined;
}

export interface SearchQueryResult {
  engineUsed: SearchEngineType;
  totalHits: number;
  hits: SearchResultItem[];
  facets: {
    categories: { value: string; count: number }[];
    brands: { value: string; count: number }[];
  };
  queryTimeMs: number;
  suggestions?: string[] | undefined;
}

export interface SynonymRule {
  id: string;
  terms: string[]; // e.g. ["ayurveda", "herbal", "herb"]
}

export interface BoostRule {
  id: string;
  field: string;
  value: string;
  boostFactor: number; // e.g., brand: "Kalyan" -> boost 2.0
  pinnedProductIds?: string[] | undefined;
}

export interface SearchAnalyticsMetric {
  query: string;
  count: number;
  zeroHitsCount: number;
  avgCtrPercentage: number;
  avgLatencyMs: number;
}
