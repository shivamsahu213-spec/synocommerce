/**
 * SynoCommerce Visual Storefront Page Builder Studio UI
 * Webflow & Elementor Quality Layout Studio
 * @module apps/admin/src/app/page-builder/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminPageBuilderPage() {
  const canvasSections = [
    { name: 'Header Navigation Bar', type: 'NAV' },
    { name: 'Kalyan Pure Ayurvedic Hero Banner', type: 'HERO' },
    { name: 'Featured Products Grid (3 Columns)', type: 'GRID' },
    { name: 'Vaidya Customer Reviews & Testimonials', type: 'SLIDER' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Visual Storefront Page Builder Studio"
      actions={
        <>
          <Button variant="secondary">📱 Viewport View</Button>
          <Button variant="secondary">💾 Save Layout</Button>
          <Button variant="primary">🚀 Publish Storefront</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Active Pages" value="12 Pages" variant="info" />
        <StatCard title="Published Layouts" value="10 Active" variant="success" />
        <StatCard title="SEO Score" value="98 / 100" variant="success" />
        <StatCard title="Lighthouse Performance" value="99 / 100" variant="success" />
        <StatCard title="Component Blocks" value="184 Blocks" variant="info" />
        <StatCard title="Draft Revisions" value="4 Saved" variant="info" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 280px', gap: '1.25rem', height: '480px' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Component Library</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, overflowY: 'auto' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB' }}>🖼️ Hero Banners</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB' }}>📦 Product Showcase</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB' }}>⭐ Customer Reviews</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#030712', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {canvasSections.map((sec, idx) => (
            <div key={idx} style={{ padding: '1rem', backgroundColor: '#111827', border: idx === 1 ? '2px solid #3B82F6' : '1px solid #1F2937', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', color: '#F3F4F6', fontSize: '0.9rem' }}>{sec.name}</span>
                <Badge variant={idx === 1 ? 'info' : 'neutral'}>{sec.type}</Badge>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Section Inspector</h3>
          <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Selected: <strong style={{ color: '#60A5FA' }}>Kalyan Hero Banner</strong></div>
        </div>
      </div>
    </AppLayout>
  );
}
