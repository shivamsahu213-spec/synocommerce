/**
 * Enterprise Search Platform Test Suite
 * @module src/modules/search/tests/search.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { SynoEnterpriseSearchEngine } from '../search-engine';

test('Enterprise Search Platform Engine', async (t) => {
  const engine = new SynoEnterpriseSearchEngine();

  await t.test('Indexes documents and executes instant search query', () => {
    const res = engine.search({ query: 'Triphala' });
    assert.equal(res.hits.length, 1);
    assert.equal(res.hits[0]!.document.title, 'Kalyan Triphala Juice 1L');
    assert.ok(res.processingTimeMs >= 0);
  });

  await t.test('Resolves typo tolerance using Levenshtein distance <= 2', () => {
    const dist = engine.calculateLevenshteinDistance('triphala', 'tripala');
    assert.equal(dist, 1); // 1 typo edit distance

    const res = engine.search({ query: 'tripala', enableTypoTolerance: true });
    assert.equal(res.hits.length, 1);
    assert.equal(res.hits[0]!.document.id, 'prod_triphala_101');
  });

  await t.test('Expands search queries using Synonym Engine', () => {
    const res = engine.search({ query: 'elixir' });
    assert.equal(res.hits.length, 1);
    assert.equal(res.hits[0]!.document.id, 'prod_triphala_101');
  });

  await t.test('Applies merchandising boost rules and pins promoted products', () => {
    engine.setMerchandisingRule({
      ruleId: 'rule_1',
      queryTrigger: 'ashwagandha',
      pinnedDocumentIds: ['prod_ashwa_102'],
      boostedBrands: ['Kalyan Ayurvedic'],
      boostFactor: 2.0,
    });

    const res = engine.search({ query: 'ashwagandha' });
    assert.equal(res.hits.length, 1);
    assert.equal(res.hits[0]!.isPinned, true);
    assert.equal(res.hits[0]!.document.id, 'prod_ashwa_102');
  });

  await t.test('Executes faceted filtering by Category and Price range', () => {
    const res = engine.search({
      query: 'Kalyan',
      categoryFilter: 'Supplements',
      minPriceUsd: 15.0,
      maxPriceUsd: 25.0,
    });

    assert.equal(res.hits.length, 1);
    assert.equal(res.hits[0]!.document.category, 'Supplements');
  });

  await t.test('Logs zero result queries for search analytics', () => {
    engine.search({ query: 'non_existent_xyz_query' });
    const zeroResults = engine.getZeroResultQueries();
    assert.ok(zeroResults.includes('non_existent_xyz_query'));
  });
});
