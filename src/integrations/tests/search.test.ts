/**
 * Enterprise Search & Discovery Platform Test Suite
 * @module src/integrations/tests/search.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SearchEngineProvider,
  SemanticSearchEngine,
  SearchSecurityEngine,
} from '../search';

test('Enterprise Search & Discovery Platform', async (t) => {
  const provider = new SearchEngineProvider();
  const semantic = new SemanticSearchEngine();

  await t.test('Indexes product documents and performs full-text & SKU search', async () => {
    await provider.bulkIndexProducts([
      {
        id: 'doc_triphala_101',
        sku: 'KAL-TRIP-1L',
        barcode: '8901234567890',
        name: 'Kalyan Ayurvedic Triphala Juice (1L)',
        description: 'Pure organic herbal juice for digestion.',
        brand: 'Kalyan Ayurvedic',
        category: 'Ayurveda',
        categories: ['Ayurveda', 'Juices'],
        priceUsd: 12.5,
        inStock: true,
        rating: 4.9,
        tags: ['digestive', 'organic'],
        updatedAt: Date.now(),
      },
      {
        id: 'doc_ashwa_102',
        sku: 'KAL-ASHWA-500G',
        name: 'Kalyan Ashwagandha Churna (500g)',
        description: 'Premium organic stress relief root powder.',
        brand: 'Kalyan Ayurvedic',
        category: 'Ayurveda',
        categories: ['Ayurveda', 'Powders'],
        priceUsd: 15.0,
        inStock: true,
        rating: 4.8,
        tags: ['stress', 'vitality'],
        updatedAt: Date.now(),
      },
    ]);

    const resText = await provider.search({ query: 'Triphala', enginePreference: 'MEILISEARCH' });
    assert.equal(resText.totalHits, 1);
    assert.equal(resText.hits[0]?.sku, 'KAL-TRIP-1L');

    const resSku = await provider.search({ query: 'KAL-ASHWA-500G', enginePreference: 'ELASTICSEARCH' });
    assert.equal(resSku.totalHits, 1);
    assert.equal(resSku.hits[0]?.id, 'doc_ashwa_102');
  });

  await t.test('Executes autocomplete typeahead suggestions', async () => {
    const suggestions = await provider.autocomplete('Kalyan');
    assert.ok(suggestions.length >= 2);
    assert.ok(suggestions.includes('Kalyan Ayurvedic Triphala Juice (1L)'));
  });

  await t.test('Applies merchandising boost rules and pinned products ranking', async () => {
    const res = await provider.search({ query: 'Ayurvedic' });
    assert.ok(res.hits.length >= 2);
    assert.equal(res.hits[0]?.id, 'doc_triphala_101'); // Pinned product appears first
    assert.equal(res.hits[0]?.isSponsored, true);
  });

  await t.test('Generates text embeddings and executes Hybrid Vector search', () => {
    const vecA = semantic.generateEmbedding('Ayurvedic Triphala Juice');
    const vecB = semantic.generateEmbedding('Ayurvedic Triphala Juice');
    const sim = semantic.cosineSimilarity(vecA, vecB);
    assert.equal(sim, 1.0); // Exact match cosine similarity = 1.0

    const docs = [
      {
        id: 'doc_1',
        sku: 'SKU-1',
        name: 'Herbal Triphala Organic',
        description: 'Organic juice',
        brand: 'Kalyan',
        category: 'Ayurveda',
        categories: ['Ayurveda'],
        priceUsd: 10,
        inStock: true,
        rating: 5,
        tags: [],
        updatedAt: Date.now(),
      },
    ];

    const hybridHits = semantic.hybridVectorSearch('Herbal Triphala Organic', docs);
    assert.equal(hybridHits.length, 1);
    assert.equal(hybridHits[0]?.score, 1.0);
  });

  await t.test('Sanitizes malicious script and SQL injection queries', () => {
    const dirty = '<script>alert("XSS")</script> Triphala UNION SELECT * FROM users';
    const clean = SearchSecurityEngine.sanitizeQuery(dirty);
    assert.equal(clean.includes('<script>'), false);
    assert.equal(clean.includes('UNION SELECT'), false);
    assert.ok(clean.includes('Triphala'));
  });
});
