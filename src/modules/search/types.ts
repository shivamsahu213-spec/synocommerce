/**
 * Enterprise Search Platform Module Types
 * @module src/modules/search/types
 */

export type SearchableEntityType =
  | 'PRODUCTS'
  | 'VARIANTS'
  | 'CATEGORIES'
  | 'BRANDS'
  | 'COLLECTIONS'
  | 'CMS_PAGES'
  | 'BLOGS'
  | 'KNOWLEDGE_BASE'
  | 'DOCUMENTS'
  | 'CUSTOMERS'
  | 'ORDERS';

export interface SearchDocument {
  id: string;
  entityType: SearchableEntityType;
  title: string;
  description: string;
  category: string;
  brand?: string | undefined;
  priceUsd?: number | undefined;
  rating?: number | undefined;
  inStock: boolean;
  tags: string[];
  vectorEmbedding?: number[] | undefined;
}

export interface MerchandisingRule {
  ruleId: string;
  queryTrigger: string;
  pinnedDocumentIds: string[];
  boostedBrands: string[];
  boostFactor: number;
}

export interface SearchQueryOptions {
  query: string;
  categoryFilter?: string | undefined;
  brandFilter?: string | undefined;
  minPriceUsd?: number | undefined;
  maxPriceUsd?: number | undefined;
  inStockOnly?: boolean | undefined;
  enableTypoTolerance?: boolean | undefined;
  enableHybridVector?: boolean | undefined;
}

export interface SearchResultItem {
  document: SearchDocument;
  score: number;
  isPinned: boolean;
}

export interface SearchQueryResult {
  query: string;
  hits: SearchResultItem[];
  totalHits: number;
  processingTimeMs: number;
  facets: {
    categories: Record<string, number>;
    brands: Record<string, number>;
  };
}
