/**
 * SynoCommerce Products Management UI (Refactored to Design System)
 * @module apps/admin/src/app/products/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminProductsPage() {
  const products = [
    {
      id: 'PROD-001',
      sku: 'SKU-TRIPHALA-1L',
      name: 'Kalyan Triphala Juice 1L',
      brand: 'Kalyan Ayurvedic',
      category: 'Juices & Elixirs',
      inventory: 2400,
      inventoryStatus: 'IN_STOCK',
      price: '$15.00',
      discount: '20% OFF',
      status: 'ACTIVE',
      rating: 4.9,
      image: '🍵',
    },
    {
      id: 'PROD-002',
      sku: 'SKU-ASHWA-60',
      name: 'Kalyan Ashwagandha Capsules 60s',
      brand: 'Kalyan Ayurvedic',
      category: 'Supplements',
      inventory: 850,
      inventoryStatus: 'IN_STOCK',
      price: '$18.00',
      discount: '10% OFF',
      status: 'ACTIVE',
      rating: 4.8,
      image: '🌿',
    },
    {
      id: 'PROD-003',
      sku: 'SKU-CHYAWAN-500',
      name: 'Kalyan Organic Chyawanprash 500g',
      brand: 'Kalyan Ayurvedic',
      category: 'Supplements',
      inventory: 120,
      inventoryStatus: 'LOW_STOCK',
      price: '$22.50',
      discount: 'NONE',
      status: 'ACTIVE',
      rating: 4.95,
      image: '🍯',
    },
    {
      id: 'PROD-004',
      sku: 'SKU-KUMKUM-30ML',
      name: 'Kalyan Kumkumadi Night Serum 30ml',
      brand: 'Kalyan Beauty',
      category: 'Personal Care & Tailam',
      inventory: 0,
      inventoryStatus: 'OUT_OF_STOCK',
      price: '$45.00',
      discount: '15% OFF',
      status: 'DRAFT',
      rating: 4.7,
      image: '✨',
    },
  ];

  return (
    <AppLayout
      activeTab="products"
      title="Products & Catalog Studio"
      actions={
        <>
          <Button variant="secondary">📥 Import CSV</Button>
          <Button variant="secondary">📤 Export CSV</Button>
          <Button variant="primary">+ Add Product</Button>
        </>
      }
    >
      {/* Product KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Products" value="14,890" />
        <StatCard title="Active SKUs" value="13,420" variant="success" />
        <StatCard title="Low Stock Alert" value="42 Items" variant="warning" />
        <StatCard title="Out of Stock" value="18 Items" variant="danger" />
      </div>

      {/* Filter Toolbar */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search products by title, SKU, or tag..."
          style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#F9FAFB', fontSize: '0.85rem', minWidth: '280px', outline: 'none' }}
        />
        <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
          <option>All Categories</option>
          <option>Juices & Elixirs</option>
          <option>Supplements</option>
        </select>
      </div>

      {/* Product Table */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}><input type="checkbox" /></th>
              <th style={{ padding: '0.75rem' }}>Product</th>
              <th style={{ padding: '0.75rem' }}>SKU</th>
              <th style={{ padding: '0.75rem' }}>Category</th>
              <th style={{ padding: '0.75rem' }}>Inventory</th>
              <th style={{ padding: '0.75rem' }}>Price</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
              <th style={{ padding: '0.75rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem' }}><input type="checkbox" /></td>
                <td style={{ padding: '0.75rem', fontWeight: '600', color: '#F3F4F6' }}>
                  <span style={{ marginRight: '0.5rem' }}>{p.image}</span> {p.name}
                </td>
                <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: '#9CA3AF' }}>{p.sku}</td>
                <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{p.category}</td>
                <td style={{ padding: '0.75rem' }}>
                  {p.inventoryStatus === 'IN_STOCK' && <Badge variant="success">{p.inventory} in stock</Badge>}
                  {p.inventoryStatus === 'LOW_STOCK' && <Badge variant="warning">{p.inventory} (Low)</Badge>}
                  {p.inventoryStatus === 'OUT_OF_STOCK' && <Badge variant="danger">Out of Stock</Badge>}
                </td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{p.price}</td>
                <td style={{ padding: '0.75rem' }}>
                  {p.status === 'ACTIVE' && <Badge variant="success">Active</Badge>}
                  {p.status === 'DRAFT' && <Badge variant="warning">Draft</Badge>}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', color: '#60A5FA', fontSize: '0.8rem', cursor: 'pointer' }}>
                    <span>Edit</span>
                    <span style={{ color: '#EF4444' }}>Delete</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
