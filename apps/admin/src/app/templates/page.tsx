/**
 * SynoCommerce Global Page & UI Template Library UI
 * Shopify Theme Store & Webflow Showcase Quality Template Center
 * @module apps/admin/src/app/templates/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminTemplatesPage() {
  const templatesList = [
    { name: 'Obsidian Luxury Ayurvedic Homepage', category: 'Storefront', rating: '4.9 ★', usage: '12 Stores' },
    { name: 'VIP Customer Portal Dashboard', category: 'Account', rating: '4.8 ★', usage: '8 Stores' },
    { name: 'Festival Flash Sale Landing Page', category: 'Promotions', rating: '5.0 ★', usage: '14 Stores' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Global Page & UI Template Library"
      actions={
        <>
          <Button variant="secondary">📥 Import Template</Button>
          <Button variant="secondary">📋 Duplicate Layout</Button>
          <Button variant="primary">+ Create Template</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Available Templates" value="34 Layouts" variant="info" />
        <StatCard title="Active Installations" value="28 Stores" variant="success" />
        <StatCard title="Avg Rating" value="4.9 / 5.0" variant="success" />
        <StatCard title="Responsive Devices" value="100% Tested" variant="success" />
        <StatCard title="Custom Sections" value="142 Blocks" variant="info" />
        <StatCard title="Design Standard" value="Apple Quality" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Template Types</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>🖼️ Storefront (14)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>📦 Product Detail (8)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>📢 Landing Pages (12)</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {templatesList.map((tmpl, idx) => (
            <div key={idx} style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <Badge variant="info">{tmpl.category}</Badge>
                  <span style={{ fontSize: '0.8rem', color: '#F59E0B', fontWeight: 'bold' }}>{tmpl.rating}</span>
                </div>
                <div style={{ fontWeight: 'bold', color: '#F3F4F6', fontSize: '0.95rem' }}>{tmpl.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem' }}>Active on {tmpl.usage}</div>
              </div>
              <div style={{ borderTop: '1px solid #1F2937', paddingTop: '0.75rem', display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <Button variant="secondary">Preview</Button>
                <Button variant="primary">Use Template</Button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Template Health</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Next.js 15 App Router</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>100% Compatible</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
