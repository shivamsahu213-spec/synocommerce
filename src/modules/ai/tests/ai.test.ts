/**
 * Enterprise AI Commerce Platform Test Suite
 * @module modules/ai/tests/ai.test
 */

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  AiAnalyticsEngine,
  AiContentGeneratorEngine,
  AiCopilotEngine,
  AiOrchestratorEngine,
  AiRecommendationEngine,
  SemanticSearchEngine,
} from '../index';

test('Enterprise AI Commerce Platform', async (t) => {
  const orchestrator = new AiOrchestratorEngine();
  const recommender = new AiRecommendationEngine();
  const search = new SemanticSearchEngine();
  const copywriter = new AiContentGeneratorEngine();
  const copilot = new AiCopilotEngine();
  const analytics = new AiAnalyticsEngine();

  await t.test('Orchestrates text generation across OpenAI provider and tracks token usage', async () => {
    const res = await orchestrator.generateText({
      provider: 'OPENAI',
      prompt: 'Write an Ayurvedic description for Bhringraj hair oil',
    });

    assert.equal(res.provider, 'OPENAI');
    assert.ok(res.totalTokens > 0);
    assert.ok(res.costUsd > 0);

    const metrics = orchestrator.getUsageMetrics();
    assert.equal(metrics.totalTokensUsed, res.totalTokens);
  });

  await t.test('Generates personalized Frequently Bought Together recommendations', () => {
    const recs = recommender.getFrequentlyBoughtTogether({ sku: 'KAL-HAIR-001' });
    assert.equal(recs.length, 2);
    assert.equal(recs[0]?.recommendedSku, 'KAL-SKIN-002');
  });

  await t.test('Computes 128-dimensional dense vector embeddings and executes hybrid search', async () => {
    const vector = search.generateVectorEmbedding('Organic Kumkumadi Elixir');
    assert.equal(vector.length, 128);

    const hits = await search.hybridSearch({ term: 'Kumkumadi', embeddingVector: vector });
    assert.equal(hits.length, 2);
    assert.ok((hits[0]?.semanticRelevanceScore ?? 0) > 0.9);
  });

  await t.test('Generates SEO meta tags and product copy via AI Content Generator', () => {
    const copy = copywriter.generateProductCopy('Chyawanprash Supreme', 'Immunity');
    assert.ok(copy.title.includes('Chyawanprash Supreme'));
    assert.ok(copy.seoMetaTitle.includes('Chyawanprash Supreme'));
    assert.ok(copy.suggestedAltText.length > 0);
  });

  await t.test('Responds to customer support chat and provides Merchant Copilot insights', async () => {
    const chatRes = await copilot.handleCustomerQuery('How to track my order?');
    assert.ok(chatRes.includes('track your order'));

    const insight = await copilot.getMerchantCopilotInsights('store_kalyan_ayurvedic');
    assert.equal(insight.priority, 'HIGH');
  });

  await t.test('Forecasts 30-day demand and predicts stockout risk via AI Analytics', () => {
    const forecast = analytics.predictDemand('KAL-HAIR-001');
    assert.equal(forecast.predictedSalesNext30Days, 450);
    assert.equal(forecast.stockoutDaysRemaining, 14);
  });
});
