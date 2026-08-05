/**
 * SynoCommerce Enterprise API Management UI
 * Stripe Developers, Shopify Developers & Kong Manager Quality Developer Portal
 * @module apps/admin/src/app/api-management/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminApiManagementPage() {
  const apiKeysList = [
    {
      id: 'KEY-001',
      app: 'Bhilai POS Terminal Integration',
      owner: 'Shivam Sahu (Super Admin)',
      scopes: 'read:inventory, write:orders',
      environment: 'PRODUCTION',
      created: 'Aug 01, 2026',
      lastUsed: '1 min ago',
      status: 'ACTIVE',
    },
    {
      id: 'KEY-002',
      app: 'SAP S/4HANA Sync Connector',
      owner: 'Enterprise Ops',
      scopes: 'full_access',
      environment: 'PRODUCTION',
      created: 'Jul 15, 2026',
      lastUsed: '4 mins ago',
      status: 'ACTIVE',
    },
    {
      id: 'KEY-003',
      app: 'Staging Mobile App iOS',
      owner: 'Dev Team',
      scopes: 'read:products',
      environment: 'STAGING',
      created: 'Jul 28, 2026',
      lastUsed: '2 days ago',
      status: 'ACTIVE',
    },
  ];

  const webhooksList = [
    {
      id: 'WH-001',
      endpoint: 'https://api.kalyanayurvedic.com/webhooks/orders',
      events: 'order.created, order.fulfilled',
      retries: '0 / 3',
      lastDelivery: '2 mins ago (200 OK)',
      status: 'HEALTHY',
    },
    {
      id: 'WH-002',
      endpoint: 'https://erp.kalyanayurvedic.com/sync/stock',
      events: 'inventory.updated',
      retries: '0 / 3',
      lastDelivery: '12 mins ago (200 OK)',
      status: 'HEALTHY',
    },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Developer Portal & API Key Management"
      actions={
        <>
          <Button variant="secondary">📚 API Specs (OpenAPI)</Button>
          <Button variant="secondary">⚡ Webhook</Button>
          <Button variant="secondary">🔐 OAuth App</Button>
          <Button variant="primary">+ Generate API Key</Button>
        </>
      }
    >
      {/* Top KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Active API Keys" value="18 Keys" variant="success" />
        <StatCard title="OAuth Applications" value="8 Apps" variant="info" />
        <StatCard title="Webhook Endpoints" value="14 Active" variant="info" />
        <StatCard title="API Requests Today" value="4.2 M" change="+14.2%" variant="success" />
        <StatCard title="Average Latency" value="38 ms" variant="success" />
        <StatCard title="Failed Requests Rate" value="0.01%" variant="success" />
      </div>

      {/* 3-Column Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Left Sidebar: Navigation */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Developer Tools</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>
              🔑 API Keys (18)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🔐 OAuth 2.0 Apps (8)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              ⚡ Webhooks (14)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              ⏱️ Rate Limits & Quotas
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              📋 Audit Request Logs
            </div>
          </div>
        </div>

        {/* Center Panel: API Keys & Webhooks Tables */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* API Keys Table */}
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid #1F2937', fontWeight: 'bold', color: '#F3F4F6' }}>Active API Credentials</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                  <th style={{ padding: '0.75rem' }}>Application</th>
                  <th style={{ padding: '0.75rem' }}>Owner</th>
                  <th style={{ padding: '0.75rem' }}>Env</th>
                  <th style={{ padding: '0.75rem' }}>Last Used</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {apiKeysList.map((k) => (
                  <tr key={k.id} style={{ borderBottom: '1px solid #1F2937' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>
                      <div>{k.app}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{k.scopes}</div>
                    </td>
                    <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{k.owner}</td>
                    <td style={{ padding: '0.75rem' }}>
                      {k.environment === 'PRODUCTION' ? <Badge variant="success">Production</Badge> : <Badge variant="info">Staging</Badge>}
                    </td>
                    <td style={{ padding: '0.75rem', color: '#60A5FA' }}>{k.lastUsed}</td>
                    <td style={{ padding: '0.75rem' }}><Badge variant="success">Active</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Webhooks Table */}
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid #1F2937', fontWeight: 'bold', color: '#F3F4F6' }}>Webhook Delivery Endpoints</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                  <th style={{ padding: '0.75rem' }}>Endpoint URL</th>
                  <th style={{ padding: '0.75rem' }}>Events</th>
                  <th style={{ padding: '0.75rem' }}>Last Delivery</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {webhooksList.map((w) => (
                  <tr key={w.id} style={{ borderBottom: '1px solid #1F2937' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#60A5FA' }}>{w.endpoint}</td>
                    <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{w.events}</td>
                    <td style={{ padding: '0.75rem', color: '#34D399' }}>{w.lastDelivery}</td>
                    <td style={{ padding: '0.75rem' }}><Badge variant="success">Healthy</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar: Rate Limits & Telemetry */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Rate Limit Status</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Token Bucket Capacity</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>10,000 req / min</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
