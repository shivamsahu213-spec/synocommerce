/**
 * SynoCommerce Visual Drag-and-Drop Email Template Designer UI
 * Klaviyo, Mailchimp & Stripo Quality Email Studio
 * @module apps/admin/src/app/email-builder/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminEmailBuilderPage() {
  const emailBlocks = [
    { name: 'Header Logo', icon: '🖼️' },
    { name: 'Hero Product Display', icon: '📦' },
    { name: 'Discount Code Banner', icon: '🏷️' },
    { name: 'Call to Action Button', icon: '🔘' },
    { name: 'Social Links Footer', icon: '📲' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Visual Drag & Drop Email Template Studio"
      actions={
        <>
          <Button variant="secondary">✉️ Send Test Email</Button>
          <Button variant="secondary">💾 Save Template</Button>
          <Button variant="primary">🚀 Deploy Campaign</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Email Templates" value="18 Templates" variant="info" />
        <StatCard title="Avg Open Rate" value="48.2%" change="+4.2%" variant="success" />
        <StatCard title="Avg CTR" value="14.1%" change="+1.8%" variant="success" />
        <StatCard title="Deliverability Rate" value="99.8%" variant="success" />
        <StatCard title="Unsubscribe Rate" value="0.04%" variant="success" />
        <StatCard title="Revenue per Email" value="$2.45" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 280px', gap: '1.25rem', height: '480px' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Email Elements</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, overflowY: 'auto' }}>
            {emailBlocks.map((b, idx) => (
              <div key={idx} style={{ padding: '0.5rem 0.75rem', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'grab' }}>
                <span>{b.icon}</span>
                <span>{b.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#030712', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: '#111827', border: '2px solid #10B981', borderRadius: '8px', textAlign: 'center' }}>
            <Badge variant="success">Header Block</Badge>
            <h2 style={{ fontSize: '1.4rem', color: '#60A5FA', margin: '0.5rem 0' }}>Monsoon Ayurvedic Festival Sale</h2>
            <p style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Exclusive 20% OFF on Kalyan Organic Chyawanprash & Triphala Juices.</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Template Styles</h3>
          <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Font: <strong style={{ color: '#FFF' }}>Inter System Sans</strong></div>
        </div>
      </div>
    </AppLayout>
  );
}
