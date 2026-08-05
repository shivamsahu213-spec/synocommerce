/**
 * SynoCommerce Enterprise Collections Management UI
 * Shopify & Apple Quality Smart & Manual Collections Studio
 * @module apps/admin/src/app/collections/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminCollectionsPage() {
  const collectionsList = [
    {
      id: 'COLL-001',
      name: 'Best Sellers 2026',
      handle: 'best-sellers-2026',
      type: 'SMART',
      productsCount: 42,
      revenue: '$840,000.00',
      status: 'PUBLISHED',
      visibility: 'FEATURED',
      updated: '1 hour ago',
    },
    {
      id: 'COLL-002',
      name: 'Seasonal Immunity Bestsellers',
      handle: 'immunity-bestsellers',
      type: 'SMART',
      productsCount: 18,
      revenue: '$425,000.00',
      status: 'PUBLISHED',
      visibility: 'FEATURED',
      updated: '3 hours ago',
    },
    {
      id: 'COLL-003',
      name: 'Vaidya Clinic Recommends',
      handle: 'vaidya-clinic-recommends',
      type: 'MANUAL',
      productsCount: 24,
      revenue: '$310,000.00',
      status: 'PUBLISHED',
      visibility: 'FEATURED',
      updated: '5 hours ago',
    },
    {
      id: 'COLL-004',
      name: 'Summer Hair Care Bundles',
      handle: 'summer-hair-care',
      type: 'MANUAL',
      productsCount: 12,
      revenue: '$92,000.00',
      status: 'DRAFT',
      visibility: 'HIDDEN',
      updated: '1 day ago',
    },
  ];

  return (
    <AppLayout
      activeTab="collections"
      title="Storefront Collections Studio"
      actions={
        <>
          <Button variant="secondary">🌐 Preview Store</Button>
          <Button variant="secondary">📥 Import</Button>
          <Button variant="secondary">📤 Export</Button>
          <Button variant="primary">+ Add Collection</Button>
        </>
      }
    >
      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Collections" value="34" />
        <StatCard title="Smart Rules" value="22" variant="info" />
        <StatCard title="Manual Curated" value="12" />
        <StatCard title="Published Live" value="30" variant="success" />
        <StatCard title="Featured Home" value="8" variant="warning" />
      </div>

      {/* 3-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1.5rem' }}>
        {/* Left Sidebar: Collections Tree */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Collections Navigation</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>
              🌟 Featured Collections (8)
            </div>
            <div style={{ paddingLeft: '1.5rem', color: '#D1D5DB', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div>• Best Sellers 2026 (42 SKUs)</div>
              <div>• Immunity Bestsellers (18 SKUs)</div>
              <div>• Vaidya Clinic Recommends (24 SKUs)</div>
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              ▶ ☀️ Seasonal & Festive (6)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              ▶ 🌿 Ayurveda & Wellness (10)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              ▶ 💇 Hair & Skin Care (8)
            </div>
          </div>
        </div>

        {/* Center: Details & Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Smart Collection Condition Editor */}
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 'bold', color: '#F3F4F6' }}>Smart Rule Editor: Best Sellers 2026</h3>
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', alignItems: 'center' }}>
              <span style={{ color: '#9CA3AF' }}>Products must match:</span>
              <span style={{ backgroundColor: '#1F2937', padding: '0.35rem 0.75rem', borderRadius: '4px', color: '#60A5FA', fontFamily: 'monospace' }}>
                Sales Velocity &gt; 100 units/mo AND Rating &gt;= 4.5
              </span>
            </div>
          </div>

          {/* Collections Table */}
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                  <th style={{ padding: '0.75rem' }}>Collection</th>
                  <th style={{ padding: '0.75rem' }}>Type</th>
                  <th style={{ padding: '0.75rem' }}>Products</th>
                  <th style={{ padding: '0.75rem' }}>Revenue</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem' }}>Visibility</th>
                </tr>
              </thead>
              <tbody>
                {collectionsList.map((col) => (
                  <tr key={col.id} style={{ borderBottom: '1px solid #1F2937' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#60A5FA' }}>{col.name}</td>
                    <td style={{ padding: '0.75rem' }}>
                      {col.type === 'SMART' ? <Badge variant="info">Smart Rule</Badge> : <Badge variant="neutral">Manual</Badge>}
                    </td>
                    <td style={{ padding: '0.75rem' }}>{col.productsCount} SKUs</td>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#34D399' }}>{col.revenue}</td>
                    <td style={{ padding: '0.75rem' }}>
                      {col.status === 'PUBLISHED' ? <Badge variant="success">Published</Badge> : <Badge variant="warning">Draft</Badge>}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {col.visibility === 'FEATURED' ? <Badge variant="success">Featured</Badge> : <Badge variant="neutral">Hidden</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar: Performance & AI */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>🎯 SEO Health Score</h4>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#10B981' }}>98 / 100</div>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem' }}>All collections have Schema.org JSON-LD tags & OpenGraph metadata.</div>
          </div>

          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>🤖 AI Smart Recommendations</h4>
            <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB', borderLeft: '3px solid #10B981' }}>
              💡 Create a "Monsoon Ayurvedic Wellness" smart collection. Projected +$45k revenue based on search query trends.
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
