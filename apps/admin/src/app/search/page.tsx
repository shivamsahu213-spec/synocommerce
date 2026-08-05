/**
 * Admin Dashboard Search Control Center & Merchandising Rules
 * @module apps/admin/app/search/page
 */

import React from 'react';

export default function AdminSearchPage() {
  const topQueries = [
    { query: 'Triphala Juice', count: 4820, ctr: '14.2%', zeroHits: 0 },
    { query: 'Ashwagandha Powder', count: 3210, ctr: '18.5%', zeroHits: 0 },
    { query: 'Ayurvedic Soap', count: 1890, ctr: '9.8%', zeroHits: 12 },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #1F2937', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#60A5FA', margin: 0 }}>Search & Merchandising Engine</h1>
        <p style={{ color: '#9CA3AF', margin: '0.25rem 0 0 0' }}>Meilisearch, Elasticsearch, OpenSearch, Algolia & Typesense</p>
      </header>

      {/* Merchandising & Indexing Action Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          🔄 Trigger Zero-Downtime Reindex
        </button>
        <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#374151', color: '#F3F4F6', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          ⚙️ Manage Boost & Pinned Rules
        </button>
      </div>

      {/* Analytics Summary */}
      <section style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem', color: '#F3F4F6' }}>Top Search Analytics & Conversion</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}>Search Query</th>
              <th style={{ padding: '0.75rem' }}>Search Count</th>
              <th style={{ padding: '0.75rem' }}>CTR</th>
              <th style={{ padding: '0.75rem' }}>Zero Hits</th>
            </tr>
          </thead>
          <tbody>
            {topQueries.map((q) => (
              <tr key={q.query} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#93C5FD' }}>{q.query}</td>
                <td style={{ padding: '0.75rem' }}>{q.count}</td>
                <td style={{ padding: '0.75rem', color: '#10B981' }}>{q.ctr}</td>
                <td style={{ padding: '0.75rem', color: q.zeroHits > 0 ? '#EF4444' : '#9CA3AF' }}>{q.zeroHits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
