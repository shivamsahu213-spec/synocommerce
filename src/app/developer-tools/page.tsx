/**
 * SynoCommerce Developer Console, API Explorer & Rate Limits Studio UI
 * Postman, Swagger & Stripe Developer Console Quality Studio
 * @module apps/admin/src/app/developer-tools/page
 */

import React from 'react';

import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminDeveloperToolsPage() {
  const apiEndpoints = [
    { method: 'GET', path: '/api/v1/products/search', latency: '14 ms', status: '200 OK', rateLimit: '1,000 / min' },
    { method: 'POST', path: '/api/v1/orders/checkout', latency: '48 ms', status: '200 OK', rateLimit: '500 / min' },
    { method: 'POST', path: '/api/v1/ai/copilot/query', latency: '220 ms', status: '200 OK', rateLimit: '100 / min' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Developer Console & Interactive OpenAPI Explorer"
      actions={
        <>
          <Button variant="secondary">📚 Download SDK (TS/Python)</Button>
          <Button variant="secondary">⚡ Test Endpoint</Button>
          <Button variant="primary">🚀 OpenAPI Specs v3.1</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="API Endpoints" value="148 Routes" variant="info" />
        <StatCard title="GraphQL Schema" value="11 Federations" variant="info" />
        <StatCard title="Total API Requests" value="4.2M / day" variant="success" />
        <StatCard title="Avg Latency" value="28 ms" variant="success" />
        <StatCard title="Rate Limit Capacity" value="10,000 req/min" variant="success" />
        <StatCard title="OpenAPI Specs" value="v3.1 Validated" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>API Resources</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>📦 Products & Search</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🛍️ Orders & Checkout</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🤖 AI Copilot Engine</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Method & Endpoint Path</th>
                <th style={{ padding: '0.75rem' }}>Avg Latency</th>
                <th style={{ padding: '0.75rem' }}>Rate Limit Bucket</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {apiEndpoints.map((ep, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>
                    <span style={{ color: ep.method === 'GET' ? '#34D399' : '#60A5FA', marginRight: '0.5rem', fontFamily: 'monospace' }}>{ep.method}</span>
                    <span style={{ fontFamily: 'monospace' }}>{ep.path}</span>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#34D399' }}>{ep.latency}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{ep.rateLimit}</td>
                  <td style={{ padding: '0.75rem' }}><Badge variant="success">200 OK</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Interactive Terminal</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>cURL Test Runner</div>
            <div style={{ fontSize: '0.85rem', color: '#10B981', fontFamily: 'monospace', marginTop: '0.25rem' }}>curl -X GET https://api...</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
