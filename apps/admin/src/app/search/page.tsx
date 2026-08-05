/**
 * SynoCommerce Enterprise Search Merchandising & Analytics Studio UI
 * @module apps/admin/src/app/search/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminSearchPage() {
  const zeroResultQueries = [
    { query: 'ashwagandha tea bags', volume: '1,420 searches', suggestion: 'Create Synonym -> Ashwagandha Powder', action: 'Add Synonym' },
    { query: 'organic triphala soap', volume: '840 searches', suggestion: 'Promote Triphala Cleansing Lotion', action: 'Create Boost Rule' },
    { query: 'ayurvedic hair regrowth gummies', volume: '620 searches', suggestion: 'Merchandise Herbal Hair Oil', action: 'Create Redirect' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Enterprise Search Engine & Merchandising Studio"
      actions={
        <>
          <Button variant="secondary">🔤 Synonyms Dictionary</Button>
          <Button variant="secondary">⚡ Boost & Pin Rules</Button>
          <Button variant="primary">+ Create Search Rule</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Search Queries" value="482,000" change="+14.8%" variant="success" />
        <StatCard title="Zero Result Rate" value="1.24%" change="-0.4%" variant="success" />
        <StatCard title="Search Conversion Rate" value="6.84%" change="+1.2%" variant="success" />
        <StatCard title="Typo Tolerance" value="Distance <= 2" variant="info" />
        <StatCard title="Synonym Mappings" value="142 Rules" variant="info" />
        <StatCard title="Pinned Products" value="28 Pinned" variant="info" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Search Merchandising</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>🔍 Search Analytics</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>❌ Zero-Result Tracking</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🔤 Bidirectional Synonyms</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>⚡ Boost & Pin Rules</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid #1F2937', fontWeight: 'bold', color: '#F3F4F6' }}>Zero-Result Queries Needing Attention</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>User Query</th>
                <th style={{ padding: '0.75rem' }}>Monthly Volume</th>
                <th style={{ padding: '0.75rem' }}>AI Recommendation</th>
                <th style={{ padding: '0.75rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {zeroResultQueries.map((q, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>"{q.query}"</td>
                  <td style={{ padding: '0.75rem', color: '#F59E0B', fontWeight: 'bold' }}>{q.volume}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{q.suggestion}</td>
                  <td style={{ padding: '0.75rem' }}><span style={{ color: '#60A5FA', cursor: 'pointer' }}>{q.action}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Search Index Telemetry</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Inverted Index Status</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>Synced (11 Entity Types)</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
