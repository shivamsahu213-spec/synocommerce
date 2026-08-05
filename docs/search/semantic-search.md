# Semantic & Hybrid Vector Search Architecture

## Overview

SynoCommerce combines keyword full-text search with vector embeddings to deliver **Hybrid Semantic Search**, allowing natural language queries like *"herbal juice for digestion"* to match product catalog items accurately.

---

## Technical Flow

1. **Embedding Generation**: Query text is converted into dense vector embeddings.
2. **Cosine Similarity**: Vector distance scoring evaluates semantic similarity.
3. **Hybrid Blending**: BM25 keyword relevance score is combined with Cosine Similarity vector scores.
