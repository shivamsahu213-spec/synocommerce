/**
 * SynoCommerce Enterprise Integrations Hub UI
 * Shopify Apps, Salesforce AppExchange & Zapier Quality Ecosystem Marketplace
 * @module apps/admin/src/app/integrations/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminIntegrationsPage() {
  const integrationsList = [
    {
      id: 'INT-001',
      name: 'Stripe Payments',
      category: 'Payments',
      icon: '💳',
      status: 'CONNECTED',
      health: 'HEALTHY',
      latency: '42 ms',
      lastSync: '2 mins ago',
      version: 'v2026.8',
    },
    {
      id: 'INT-002',
      name: 'SAP S/4HANA ERP',
      category: 'ERP Integration',
      icon: '🏢',
      status: 'CONNECTED',
      health: 'HEALTHY',
      latency: '110 ms',
      lastSync: '12 mins ago',
      version: 'v4.2.1',
    },
    {
      id: 'INT-003',
      name: 'Klaviyo Marketing Automation',
      category: 'Marketing',
      icon: '📧',
      status: 'CONNECTED',
      health: 'HEALTHY',
      latency: '68 ms',
      lastSync: '5 mins ago',
      version: 'v3.8',
    },
    {
      id: 'INT-004',
      name: 'Salesforce Commerce Cloud',
      category: 'CRM & Omnichannel',
      icon: '☁️',
      status: 'CONNECTED',
      health: 'HEALTHY',
      latency: '95 ms',
      lastSync: '18 mins ago',
      version: 'v5.0',
    },
    {
      id: 'INT-005',
      name: 'FedEx Express Shipping',
      category: 'Logistics',
      icon: '🚚',
      status: 'CONNECTED',
      health: 'HEALTHY',
      latency: '140 ms',
      lastSync: '30 mins ago',
      version: 'v2.1',
    },
    {
      id: 'INT-006',
      name: 'OpenAI Enterprise GPT-4o',
      category: 'AI Engine',
      icon: '🤖',
      status: 'CONNECTED',
      health: 'HEALTHY',
      latency: '220 ms',
      lastSync: '1 min ago',
      version: 'v4.0',
    },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Enterprise Integrations Hub & API Marketplace"
      actions={
        <>
          <Button variant="secondary">🛍️ Browse Marketplace</Button>
          <Button variant="secondary">🔑 API Key</Button>
          <Button variant="secondary">📥 Import Config</Button>
          <Button variant="primary">+ Add Integration</Button>
        </>
      }
    >
      {/* Top KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Connected Apps" value="28 Apps" variant="success" />
        <StatCard title="Available Connectors" value="142" variant="info" />
        <StatCard title="Failed Syncs Today" value="0 Syncs" variant="success" />
        <StatCard title="API Requests Today" value="4.2 M" change="+14.2%" variant="success" />
        <StatCard title="Webhook Delivery" value="99.98%" variant="success" />
        <StatCard title="Marketplace Ecosystem" value="350+ Apps" variant="info" />
      </div>

      {/* 3-Column Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Left Sidebar: Categories */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Categories</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>
              💳 Payment Gateways (4)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🏢 Enterprise ERPs (2)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              📧 Marketing Automation (6)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🚚 Shipping & Logistics (5)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🤖 AI & Copilot Services (3)
            </div>
          </div>
        </div>

        {/* Center Panel: Integrations Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {integrationsList.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#F3F4F6', fontSize: '0.95rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{item.category}</div>
                    </div>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#9CA3AF', display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Latency: <strong style={{ color: '#10B981' }}>{item.latency}</strong></span>
                  <span>Version: {item.version}</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #1F2937', paddingTop: '0.75rem', display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <Button variant="secondary">Configure</Button>
                <Button variant="secondary">Logs</Button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar: Webhook Delivery Queue */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Webhook Delivery Stream</h3>
          <div style={{ fontSize: '0.8rem', color: '#D1D5DB' }}>
            ⚡ <code>order.created</code> dispatched to SAP S/4HANA (200 OK)
          </div>
          <div style={{ fontSize: '0.8rem', color: '#D1D5DB' }}>
            ⚡ <code>customer.updated</code> dispatched to Salesforce (200 OK)
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
