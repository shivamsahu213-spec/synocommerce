export interface SearchQuery {
  index: string;
  text: string;
  filters?: Record<string, string | number | boolean>;
  page?: number;
  perPage?: number;
}

export interface SearchHit<TDocument = unknown> {
  id: string;
  score?: number;
  document: TDocument;
}

export interface SearchResponse<TDocument = unknown> {
  hits: SearchHit<TDocument>[];
  total: number;
}

export interface SearchDriver {
  search<TDocument = unknown>(query: SearchQuery): Promise<SearchResponse<TDocument>>;
}
