/**
 * Search Engine Module
 * @module modules/commerce-engine/search/search-engine
 */

export interface SearchProductDoc {
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly category: string;
  readonly brand: string;
  readonly price: number;
  readonly tags: readonly string[];
}

export interface SearchQuery {
  readonly term?: string | undefined;
  readonly category?: string | undefined;
  readonly brand?: string | undefined;
  readonly minPrice?: number | undefined;
  readonly maxPrice?: number | undefined;
  readonly sortBy?: 'price_asc' | 'price_desc' | 'relevance' | undefined;
}

export class SearchEngine {
  private readonly _documents = new Map<string, SearchProductDoc>();

  public indexProduct(doc: SearchProductDoc): void {
    this._documents.set(doc.id, doc);
  }

  public search(query: SearchQuery): readonly SearchProductDoc[] {
    let results = Array.from(this._documents.values());

    if (query.term) {
      const termLower = query.term.toLowerCase();
      results = results.filter(
        (d) =>
          d.name.toLowerCase().includes(termLower) ||
          d.sku.toLowerCase().includes(termLower) ||
          d.tags.some((t) => t.toLowerCase().includes(termLower))
      );
    }

    if (query.category) {
      results = results.filter((d) => d.category === query.category);
    }

    if (query.brand) {
      results = results.filter((d) => d.brand === query.brand);
    }

    if (query.minPrice !== undefined) {
      results = results.filter((d) => d.price >= query.minPrice!);
    }

    if (query.maxPrice !== undefined) {
      results = results.filter((d) => d.price <= query.maxPrice!);
    }

    if (query.sortBy === 'price_asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (query.sortBy === 'price_desc') {
      results.sort((a, b) => b.price - a.price);
    }

    return results;
  }

  public autocomplete(prefix: string): readonly string[] {
    const termLower = prefix.toLowerCase();
    const matches = new Set<string>();
    for (const doc of this._documents.values()) {
      if (doc.name.toLowerCase().includes(termLower)) {
        matches.add(doc.name);
      }
    }
    return Array.from(matches).slice(0, 5);
  }
}
