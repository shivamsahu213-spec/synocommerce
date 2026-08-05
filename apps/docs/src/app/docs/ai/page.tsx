/**
 * Docs: Enterprise AI Platform Page
 * @module apps/docs/app/docs/ai/page
 */

import React from 'react';

export default function AiDocsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#60A5FA' }}>Enterprise AI Commerce Platform</h1>
      <p style={{ color: '#9CA3AF', fontSize: '1.1rem', marginBottom: '2rem' }}>
        The SynoCommerce AI Engine (`src/modules/ai/`) provides provider-agnostic model routing across OpenAI, Anthropic, and Google Gemini.
      </p>

      <h2>Capabilities</h2>
      <ul>
        <li><strong>Vector Semantic Search:</strong> 128-dimensional dense vector embeddings and hybrid search reranking.</li>
        <li><strong>Merchant Copilot:</strong> Automated stockout risk alerts and reorder suggestions.</li>
        <li><strong>AI Copywriter:</strong> Auto-generates product descriptions, SEO meta titles, and image alt text.</li>
      </ul>
    </div>
  );
}
