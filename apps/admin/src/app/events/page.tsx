/**
 * SynoCommerce Enterprise Event Stream & Message Bus UI
 * Apache Kafka, AWS EventBridge & RabbitMQ Quality Event Studio
 * @module apps/admin/src/app/events/page
 */

import React from 'react';

import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminEventsPage() {
  const eventTopics = [
    { name: 'syno.orders.v1', producers: 'Gateway, POS', consumers: 'Inventory, ERP, Analytics', msgRate: '1,420 msgs/s', status: 'ACTIVE' },
    { name: 'syno.inventory.v1', producers: 'Warehouses', consumers: 'Search Index, Storefront', msgRate: '840 msgs/s', status: 'ACTIVE' },
    { name: 'syno.customers.v1', producers: 'CRM, Auth', consumers: 'Klaviyo, Loyalty', msgRate: '620 msgs/s', status: 'ACTIVE' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Enterprise Event Stream & Event-Driven Bus Studio"
      actions={
        <>
          <Button variant="secondary">📡 Topic Schema Registry</Button>
          <Button variant="secondary">📊 Throughput Analytics</Button>
          <Button variant="primary">+ Create Event Topic</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Event Topics" value="18 Topics" variant="info" />
        <StatCard title="Event Throughput" value="14,200 msgs/s" change="+18.4%" variant="success" />
        <StatCard title="Producers Connected" value="24 Services" variant="info" />
        <StatCard title="Consumers Active" value="48 Consumers" variant="info" />
        <StatCard title="Consumer Lag" value="0 msgs Lag" variant="success" />
        <StatCard title="Event Schema Health" value="100% Valid" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Event Domains</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>🛍️ Commerce Domain</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>📦 Inventory Domain</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>👥 Customer Domain</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Event Topic Name</th>
                <th style={{ padding: '0.75rem' }}>Producers</th>
                <th style={{ padding: '0.75rem' }}>Consumers</th>
                <th style={{ padding: '0.75rem' }}>Message Velocity</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {eventTopics.map((t, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6', fontFamily: 'monospace' }}>{t.name}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{t.producers}</td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA' }}>{t.consumers}</td>
                  <td style={{ padding: '0.75rem', color: '#34D399', fontWeight: 'bold' }}>{t.msgRate}</td>
                  <td style={{ padding: '0.75rem' }}><Badge variant="success">Active</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Partition Leader</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Kafka Cluster Leader</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>Bhilai Hub Cluster Node-01</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
