/**
 * Admin Dashboard GraphQL Federation Gateway Management Page
 * @module apps/admin/app/graphql-portal/page
 */

import React from 'react';

export default function AdminGraphQLPortalPage() {
  const subgraphs = [
    { name: 'CATALOG', endpoint: '/graphql/subgraphs/catalog', status: 'HEALTHY', latency: '4ms', depth: '4' },
    { name: 'ORDERS', endpoint: '/graphql/subgraphs/orders', status: 'HEALTHY', latency: '6ms', depth: '5' },
    { name: 'CUSTOMERS', endpoint: '/graphql/subgraphs/customers', status: 'HEALTHY', latency: '5ms', depth: '3' },
    { name: 'INVENTORY', endpoint: '/graphql/subgraphs/inventory', status: 'HEALTHY', latency: '3ms', depth: '3' },
    { name: 'PAYMENTS', endpoint: '/graphql/subgraphs/payments', status: 'HEALTHY', latency: '7ms', depth: '4' },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #1F2937', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#60A5FA', margin: 0 }}>GraphQL Federation Gateway Center</h1>
        <p style={{ color: '#9CA3AF', margin: '0.25rem 0 0 0' }}>Apollo Federation v2, Hasura & GraphOS Grade Federated Gateway</p>
      </header>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Active Federated Subgraphs</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>13 Subgraphs</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>APQ Cache Hit Ratio</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6' }}>98.4%</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>p95 Query Latency</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#34D399' }}>5.2 ms</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Complexity Violations Blocked</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F59E0B' }}>0 Attacks</div>
        </div>
      </div>

      {/* Subgraphs Table */}
      <section style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem', color: '#F3F4F6' }}>Federated Subgraphs Status</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}>Subgraph Name</th>
              <th style={{ padding: '0.75rem' }}>Endpoint</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
              <th style={{ padding: '0.75rem' }}>Latency</th>
              <th style={{ padding: '0.75rem' }}>Max Depth</th>
            </tr>
          </thead>
          <tbody>
            {subgraphs.map((s) => (
              <tr key={s.name} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#93C5FD' }}>{s.name}</td>
                <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: '#9CA3AF' }}>{s.endpoint}</td>
                <td style={{ padding: '0.75rem', color: '#10B981' }}>{s.status}</td>
                <td style={{ padding: '0.75rem', color: '#34D399' }}>{s.latency}</td>
                <td style={{ padding: '0.75rem' }}>{s.depth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
