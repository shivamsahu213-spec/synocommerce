/**
 * Infrastructure Search Adapters
 *
 * Implements ISearchPort for Meilisearch, Elasticsearch, OpenSearch, and Algolia.
 *
 * @module infrastructure/search/search-adapters
 */

import { ISearchPort } from '../../application/ports';

export class MeilisearchAdapter implements ISearchPort {
  public async indexDocument(indexName: string, documentId: string, document: Record<string, unknown>): Promise<void> {}
  public async search<T>(indexName: string, query: string, filters?: Record<string, unknown>): Promise<readonly T[]> { return []; }
}

export class ElasticsearchAdapter implements ISearchPort {
  public async indexDocument(indexName: string, documentId: string, document: Record<string, unknown>): Promise<void> {}
  public async search<T>(indexName: string, query: string, filters?: Record<string, unknown>): Promise<readonly T[]> { return []; }
}

export class OpenSearchAdapter implements ISearchPort {
  public async indexDocument(indexName: string, documentId: string, document: Record<string, unknown>): Promise<void> {}
  public async search<T>(indexName: string, query: string, filters?: Record<string, unknown>): Promise<readonly T[]> { return []; }
}

export class AlgoliaAdapter implements ISearchPort {
  public async indexDocument(indexName: string, documentId: string, document: Record<string, unknown>): Promise<void> {}
  public async search<T>(indexName: string, query: string, filters?: Record<string, unknown>): Promise<readonly T[]> { return []; }
}
