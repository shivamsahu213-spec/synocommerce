/**
 * SynoCommerce Webhook Endpoints, Delivery Logs & Retry Queue UI
 * Stripe & GitHub Quality Webhook Engine
 * @module apps/admin/src/app/webhooks/page
 */

import React from 'react';

import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminWebhooksPage() {
  const webhookLogs = [
    { id: 'DEL-901', endpoint: 'https://api.kalyanayurvedic.com/webhooks/orders', event: 'order.created', response: '200 OK', latency: '42 ms', retries: '0', status: 'SUCCESS' },
    { id: 'DEL-902', endpoint: 'https://erp.kalyanayurvedic.com/sync/stock', event: 'inventory.updated', response: '200 OK', latency: '110 ms', retries: '0', status: 'SUCCESS' },
    { id: 'DEL-903', endpoint: 'https://crm.kalyanayurvedic.com/webhook/vip', event: 'customer.vip_promoted', response: '502 Bad Gateway', latency: '1.2 s', retries: '2', status: 'RETRYING' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Webhook Endpoints & Delivery Queue Stream"
      actions={
        <>
          <Button variant="secondary">🔄 Replay Failed Deliveries</Button>
          <Button variant="secondary">⚡ Test Webhook</Button>
          <Button variant="primary">+ Add Webhook Endpoint</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Active Endpoints" value="14 Endpoints" variant="info" />
        <StatCard title="Deliveries Today" value="48,200 Events" variant="info" />
        <StatCard title="Success Rate" value="99.98%" variant="success" />
        <StatCard title="Retry Queue" value="1 Retrying" variant="warning" />
        <StatCard title="Avg Delivery Latency" value="48 ms" variant="success" />
        <StatCard title="HMAC Signature" value="SHA-256 Active" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Event Subscriptions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>🛍️ order.created</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>📦 inventory.updated</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>👑 customer.vip_promoted</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Delivery ID</th>
                <th style={{ padding: '0.75rem' }}>Endpoint URL</th>
                <th style={{ padding: '0.75rem' }}>Subscribed Event</th>
                <th style={{ padding: '0.75rem' }}>Response & Latency</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {webhookLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>{log.id}</td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA' }}>{log.endpoint}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF', fontFamily: 'monospace' }}>{log.event}</td>
                  <td style={{ padding: '0.75rem', color: log.status === 'SUCCESS' ? '#34D399' : '#F59E0B' }}>{log.response} ({log.latency})</td>
                  <td style={{ padding: '0.75rem' }}>
                    {log.status === 'SUCCESS' ? <Badge variant="success">Success</Badge> : <Badge variant="warning">Retrying ({log.retries})</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Security Verification</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Webhook Secret Key</div>
            <div style={{ fontSize: '0.85rem', color: '#10B981', fontFamily: 'monospace', marginTop: '0.25rem' }}>whsec_syno_98240...</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
