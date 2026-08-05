/**
 * SynoCommerce Enterprise Categories Management UI
 * Shopify & Apple Quality Production Taxonomy & Category Studio
 * @module apps/admin/src/app/categories/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminCategoriesPage() {
  const categoriesList = [
    {
      id: 'CAT-001',
      name: 'Juices & Elixirs',
      slug: 'juices-elixirs',
      parent: 'Health & Ayurveda',
      productsCount: 3840,
      revenue: '$622,000.00',
      visibility: 'VISIBLE',
      status: 'ACTIVE',
    },
    {
      id: 'CAT-002',
      name: 'Supplements & Churna',
      slug: 'supplements-churna',
      parent: 'Health & Ayurveda',
      productsCount: 2910,
      revenue: '$504,000.00',
      visibility: 'VISIBLE',
      status: 'ACTIVE',
    },
    {
      id: 'CAT-003',
      name: 'Personal Care & Tailam',
      slug: 'personal-care-tailam',
      parent: 'Beauty & Skincare',
      productsCount: 2150,
      revenue: '$356,000.00',
      visibility: 'VISIBLE',
      status: 'ACTIVE',
    },
    {
      id: 'CAT-004',
      name: 'Seasonal Festival Bundles',
      slug: 'festival-bundles',
      parent: 'Promotions',
      productsCount: 120,
      revenue: '$85,000.00',
      visibility: 'HIDDEN',
      status: 'DRAFT',
    },
  ];

  return (
    <AppLayout
      activeTab="categories"
      title="Category & Taxonomy Studio"
      actions={
        <>
          <Button variant="secondary">📥 Import</Button>
          <Button variant="secondary">📤 Export</Button>
          <Button variant="primary">+ Add Category</Button>
        </>
      }
    >
      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Categories" value="48" />
        <StatCard title="Active Categories" value="42" variant="success" />
        <StatCard title="Hidden Categories" value="6" variant="warning" />
        <StatCard title="Avg Products / Cat" value="310 SKUs" />
        <StatCard title="Top Performing" value="Juices & Elixirs" variant="info" />
      </div>

      {/* 3-Column Layout: Left Tree, Center Details, Right Performance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1.5rem' }}>
        {/* Left Panel: Expandable Category Tree */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Taxonomy Tree View</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>
              ▼ 🌿 Health & Ayurveda (12 Subcategories)
            </div>
            <div style={{ paddingLeft: '1.5rem', color: '#D1D5DB', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div>• Juices & Elixirs (3,840 SKUs)</div>
              <div>• Supplements & Churna (2,910 SKUs)</div>
              <div>• Organic Herbal Teas (850 SKUs)</div>
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              ▶ ✨ Beauty & Skincare (8 Subcategories)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              ▶ 🛋️ Home & Lifestyle (6 Subcategories)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              ▶ ⚽ Sports & Fitness (4 Subcategories)
            </div>
          </div>
        </div>

        {/* Center Panel: Category Detail & Data Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Active Category Detail Editor */}
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 'bold', color: '#F3F4F6' }}>Editing: Juices & Elixirs</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
              <div>
                <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.25rem' }}>Category Name</label>
                <input type="text" defaultValue="Juices & Elixirs" style={{ width: '100%', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '4px', padding: '0.4rem 0.75rem', color: '#FFF' }} />
              </div>
              <div>
                <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.25rem' }}>URL Slug</label>
                <input type="text" defaultValue="juices-elixirs" style={{ width: '100%', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '4px', padding: '0.4rem 0.75rem', color: '#FFF' }} />
              </div>
            </div>
          </div>

          {/* Categories Table */}
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                  <th style={{ padding: '0.75rem' }}>Category</th>
                  <th style={{ padding: '0.75rem' }}>Parent</th>
                  <th style={{ padding: '0.75rem' }}>Products</th>
                  <th style={{ padding: '0.75rem' }}>Revenue</th>
                  <th style={{ padding: '0.75rem' }}>Visibility</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {categoriesList.map((cat) => (
                  <tr key={cat.id} style={{ borderBottom: '1px solid #1F2937' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#60A5FA' }}>{cat.name}</td>
                    <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{cat.parent}</td>
                    <td style={{ padding: '0.75rem' }}>{cat.productsCount}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#34D399' }}>{cat.revenue}</td>
                    <td style={{ padding: '0.75rem' }}>
                      {cat.visibility === 'VISIBLE' ? <Badge variant="success">Visible</Badge> : <Badge variant="warning">Hidden</Badge>}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {cat.status === 'ACTIVE' ? <Badge variant="success">Active</Badge> : <Badge variant="neutral">Draft</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel: Performance & AI SEO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>📈 Category Telemetry</h4>
            <div style={{ fontSize: '0.85rem', color: '#D1D5DB' }}>
              <div><strong>Views (30d):</strong> 142,500</div>
              <div style={{ marginTop: '0.35rem' }}><strong>Conversion:</strong> 4.8%</div>
              <div style={{ marginTop: '0.35rem' }}><strong>Total Revenue:</strong> $622,000</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>🤖 AI SEO Recommendations</h4>
            <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB', borderLeft: '3px solid #3B82F6' }}>
              💡 Meta Title suggestion: "Pure Organic Ayurvedic Juices & Elixirs - Kalyan". Expected +14% CTR boost.
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
