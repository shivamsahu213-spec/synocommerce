/**
 * SynoCommerce Enterprise Storefront Navigation & Menu Builder UI
 * Shopify Navigation, BigCommerce Menu Builder & Webflow Quality Tree Builder
 * @module apps/admin/src/app/navigation/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminNavigationPage() {
  const menuTree = [
    {
      id: 'NAV-001',
      title: '🌿 Ayurvedic Wellness',
      url: '/collections/ayurvedic-wellness',
      isMegaMenu: true,
      children: [
        { title: 'Triphala & Organic Juices', url: '/products/triphala-juice' },
        { title: 'Ashwagandha Formulations', url: '/products/ashwagandha' },
        { title: 'Chyawanprash & Immunity', url: '/products/chyawanprash' },
      ],
    },
    {
      id: 'NAV-002',
      title: '🧴 Skin & Hair Care',
      url: '/collections/skin-hair',
      isMegaMenu: false,
      children: [
        { title: 'Kumkumadi Radiance Serums', url: '/products/kumkumadi-serum' },
        { title: 'Herbal Hair Oils & Tonics', url: '/products/herbal-oils' },
      ],
    },
    {
      id: 'NAV-003',
      title: '🩺 Vaidya Consultations',
      url: '/pages/vaidya-consult',
      isMegaMenu: false,
      children: [],
    },
    {
      id: 'NAV-004',
      title: '📍 Store Locator (Bhilai & Raipur)',
      url: '/pages/stores',
      isMegaMenu: false,
      children: [],
    },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Storefront Navigation & Mega Menu Builder"
      actions={
        <>
          <Button variant="secondary">📥 Import Tree</Button>
          <Button variant="secondary">📤 Export JSON</Button>
          <Button variant="secondary">🚀 Publish Changes</Button>
          <Button variant="primary">+ Create Menu</Button>
        </>
      }
    >
      {/* Top KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Menus" value="12 Menus" variant="info" />
        <StatCard title="Published Menus" value="10 Active" variant="success" />
        <StatCard title="Mega Menus" value="2 Configured" variant="info" />
        <StatCard title="Footer Menus" value="4 Active" />
        <StatCard title="Navigation Items" value="84 Links" variant="info" />
        <StatCard title="Broken Links" value="0 Broken" variant="success" />
      </div>

      {/* 3-Column Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 280px', gap: '1.25rem', height: 'calc(100vh - 140px)' }}>
        {/* Left Sidebar: Menus List */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Navigation Menus</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>
              🔝 Main Header Menu (Primary)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🔚 Footer Quick Links
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              📱 Mobile App Drawer
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              👤 Account & Orders Navigation
            </div>
          </div>
        </div>

        {/* Center Panel: Visual Tree Builder */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#F3F4F6' }}>Main Header Menu Tree Hierarchy</h3>
            <Button variant="primary">+ Add Menu Item</Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            {menuTree.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ cursor: 'grab', color: '#6B7280' }}>⋮⋮</span>
                    <span style={{ fontWeight: 'bold', color: '#F3F4F6', fontSize: '0.9rem' }}>{item.title}</span>
                    <span style={{ fontSize: '0.75rem', color: '#60A5FA' }}>{item.url}</span>
                    {item.isMegaMenu && <Badge variant="info">Mega Menu</Badge>}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: '#60A5FA', cursor: 'pointer' }}>
                    <span>+ Sub-item</span>
                    <span>Edit</span>
                    <span style={{ color: '#EF4444' }}>Delete</span>
                  </div>
                </div>

                {/* Sub-items Tree */}
                {item.children.length > 0 && (
                  <div style={{ marginLeft: '1.5rem', borderLeft: '2px dashed #374151', paddingLeft: '1rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.children.map((child, cIdx) => (
                      <div key={cIdx} style={{ padding: '0.5rem', backgroundColor: '#111827', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <span style={{ color: '#D1D5DB' }}>↳ {child.title} ({child.url})</span>
                        <span style={{ color: '#60A5FA', cursor: 'pointer' }}>Edit</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Item Inspector */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Link Properties</h3>
          <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.25rem' }}>Navigation Label</label>
              <input type="text" defaultValue="🌿 Ayurvedic Wellness" style={{ width: '100%', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '4px', padding: '0.4rem 0.75rem', color: '#FFF' }} />
            </div>
            <div>
              <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.25rem' }}>Destination URL</label>
              <input type="text" defaultValue="/collections/ayurvedic-wellness" style={{ width: '100%', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '4px', padding: '0.4rem 0.75rem', color: '#FFF' }} />
            </div>
          </div>
          <div style={{ borderTop: '1px solid #1F2937', paddingTop: '1rem', marginTop: 'auto' }}>
            <div style={{ fontSize: '0.8rem', color: '#10B981' }}>✅ Link Verified (200 OK)</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
