/**
 * SynoCommerce Enterprise Storefront Theme Designer & Design System Studio
 * Shopify Theme Editor, Webflow Designer & Framer Quality Storefront Customizer
 * @module apps/admin/src/app/theme-designer/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminThemeDesignerPage() {
  const designTokens = [
    { label: 'Primary Brand Color', color: '#3B82F6' },
    { label: 'Accent Emerald', color: '#10B981' },
    { label: 'Background Dark Obsidian', color: '#0B0F19' },
    { label: 'Surface Container', color: '#111827' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Storefront Theme Designer & Branding Studio"
      actions={
        <>
          <Button variant="secondary">📋 Duplicate Theme</Button>
          <Button variant="secondary">📥 Import Theme</Button>
          <Button variant="secondary">👁️ Preview Store</Button>
          <Button variant="primary">🚀 Publish Theme Live</Button>
        </>
      }
    >
      {/* Top KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Active Theme" value="Obsidian Luxury" variant="success" />
        <StatCard title="Published Version" value="v4.2.1" variant="info" />
        <StatCard title="Draft Changes" value="3 Unsaved" variant="warning" />
        <StatCard title="Brand Assets" value="182 Assets" variant="info" />
        <StatCard title="Templates Available" value="14 Layouts" />
        <StatCard title="Pages Customized" value="12 Pages" variant="info" />
      </div>

      {/* 3-Column Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 280px', gap: '1.25rem', height: 'calc(100vh - 140px)' }}>
        {/* Left Sidebar: Theme Controls */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Theme Elements</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>
              🎨 Branding & Colors
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🔤 Typography (Inter & Outfit)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🔘 Buttons & Controls
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🔝 Sticky Navigation Header
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🔚 Footer & Legal Links
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              💻 Custom CSS Override
            </div>
          </div>
        </div>

        {/* Center Panel: Store Viewport Canvas */}
        <div style={{ backgroundColor: '#030712', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Header Preview */}
          <div style={{ backgroundColor: '#111827', border: '1px dashed #3B82F6', borderRadius: '6px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', color: '#60A5FA' }}>🌿 Kalyan Pure Ayurvedic</div>
            <div style={{ fontSize: '0.8rem', color: '#9CA3AF', display: 'flex', gap: '1rem' }}>
              <span>Home</span>
              <span>Shop All</span>
              <span>Vaidya Consult</span>
              <span>Cart (0)</span>
            </div>
          </div>

          {/* Hero Banner Preview */}
          <div style={{ background: 'linear-gradient(135deg, #1E3A8A, #064E3B)', borderRadius: '8px', padding: '2.5rem', border: '1px dashed #3B82F6', textAlign: 'center' }}>
            <Badge variant="success">Hero Banner Section</Badge>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#FFF', marginTop: '0.5rem' }}>Pure Ayurvedic Formulations</h1>
            <p style={{ color: '#D1D5DB', fontSize: '0.9rem' }}>Direct from Bhilai & Raipur Farms to Your Doorstep.</p>
          </div>
        </div>

        {/* Right Sidebar: Inspector */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Token Inspector</h3>
          <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {designTokens.map((t, idx) => (
              <div key={idx} style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#D1D5DB' }}>{t.label}</span>
                <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: t.color, border: '1px solid #FFF' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
