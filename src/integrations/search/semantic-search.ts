/**
 * Semantic & Hybrid Vector Search Engine
 * @module src/integrations/search/semantic-search
 */

import { ProductSearchDocument, SearchResultItem } from './types';

export class SemanticSearchEngine {
  public generateEmbedding(text: string): number[] {
    // 8-dimensional mock embedding vector derived from text char codes for deterministic testing
    const vector = new Array(8).fill(0);
    for (let i = 0; i < text.length; i++) {
      vector[i % 8] += text.charCodeAt(i) / 1000;
    }
    return vector;
  }

  public cosineSimilarity(a: number[], b: number[]): number {
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      dot += (a[i] || 0) * (b[i] || 0);
      normA += (a[i] || 0) ** 2;
      normB += (b[i] || 0) ** 2;
    }
    if (normA === 0 || normB === 0) return 0;
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  public hybridVectorSearch(
    queryText: string,
    documents: ProductSearchDocument[]
  ): SearchResultItem[] {
    const queryVec = this.generateEmbedding(queryText);

    return documents
      .map((doc) => {
        const docVec = doc.embeddingVector || this.generateEmbedding(doc.name);
        const sim = this.cosineSimilarity(queryVec, docVec);
        return {
          id: doc.id,
          sku: doc.sku,
          name: doc.name,
          brand: doc.brand,
          category: doc.category,
          priceUsd: doc.priceUsd,
          score: Number(sim.toFixed(4)),
        };
      })
      .sort((a, b) => b.score - a.score);
  }
}
