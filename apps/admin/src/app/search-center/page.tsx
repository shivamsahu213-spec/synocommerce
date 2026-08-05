/**
 * Admin Dashboard Enterprise Search Control Center
 * @module apps/admin/app/search-center/page
 */

import React from 'react';

export default function AdminSearchCenterPage() {
  const merchandisingRules = [
    { ruleId: 'rule_triphala_boost', trigger: 'juice', pinnedProduct: 'Kalyan Triphala Juice 1L', boostFactor: '2.5x', status: 'ACTIVE' },
    { ruleId: 'rule_ashwa_boost', trigger: 'stress', pinnedProduct: 'Kalyan Ashwagandha Capsules', boostFactor: '3.0x', status: 'ACTIVE' },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #1F2937', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#60A5FA', margin: 0 }}>Enterprise Search & Discovery Control Center</h1>
        <p style={{ color: '#9CA3AF', margin: '0.25rem 0 0 0' }}>Algolia, Meilisearch & Coveo Grade Hybrid Vector & Merchandising Engine</p>
      </header>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Indexed Search Documents</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>124,500 Docs</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Instant Search Latency</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6' }}>1.8 ms</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Zero Result Query Rate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#34D399' }}>0.02%</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Active Merchandising Rules</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F59E0B' }}>42 Rules</div>
        </div>
      </div>

      {/* Merchandising Rules Table */}
      <section style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem', color: '#F3F4F6' }}>Active Merchandising Boost & Pin Rules</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}>Rule ID</th>
              <th style={{ padding: '0.75rem' }}>Trigger Query</th>
              <th style={{ padding: '0.75rem' }}>Pinned Product</th>
              <th style={{ padding: '0.75rem' }}>Brand Boost Factor</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {merchandisingRules.map((r) => (
              <tr key={r.ruleId} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#93C5FD' }}>{r.ruleId}</td>
                <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: '#F3F4F6' }}>"{r.trigger}"</td>
                <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{r.pinnedProduct}</td>
                <td style={{ padding: '0.75rem', color: '#34D399', fontWeight: 'bold' }}>{r.boostFactor}</td>
                <td style={{ padding: '0.75rem', color: '#10B981' }}>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
