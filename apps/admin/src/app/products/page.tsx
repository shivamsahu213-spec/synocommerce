/**
 * SynoCommerce Enterprise Products Management UI
 * Shopify & Apple Quality Production Products Catalog & Inventory Studio
 * @module apps/admin/src/app/products/page
 */

import React from 'react';

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
    {
      id: 'PROD-005',
      sku: 'SKU-BHRING-200ML',
      name: 'Kalyan Bhringraj Hair Oil 200ml',
      brand: 'Kalyan Beauty',
      category: 'Personal Care & Tailam',
      inventory: 1540,
      inventoryStatus: 'IN_STOCK',
      price: '$28.00',
      discount: 'NONE',
      status: 'ARCHIVED',
      rating: 4.6,
      image: '🧴',
    },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: '260px', backgroundColor: '#111827', borderRight: '1px solid #1F2937', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#FFF' }}>
            S
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#F3F4F6' }}>SynoCommerce</div>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Products Catalog</div>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <a href="/dashboard" style={{ padding: '0.75rem 1rem', borderRadius: '6px', color: '#9CA3AF', textDecoration: 'none' }}>
            📊 Executive Dashboard
          </a>
          <a href="/products" style={{ padding: '0.75rem 1rem', borderRadius: '6px', backgroundColor: '#1F2937', color: '#60A5FA', fontWeight: '600', textDecoration: 'none' }}>
            📦 Products & Inventory
          </a>
          <a href="/analytics" style={{ padding: '0.75rem 1rem', borderRadius: '6px', color: '#9CA3AF', textDecoration: 'none' }}>
            📈 Business Intelligence
          </a>
          <a href="/low-code-portal" style={{ padding: '0.75rem 1rem', borderRadius: '6px', color: '#9CA3AF', textDecoration: 'none' }}>
            🧩 Low-Code App Builder
          </a>
          <a href="/migration-center" style={{ padding: '0.75rem 1rem', borderRadius: '6px', color: '#9CA3AF', textDecoration: 'none' }}>
            🚚 Migration Toolkit
          </a>
          <a href="/search-center" style={{ padding: '0.75rem 1rem', borderRadius: '6px', color: '#9CA3AF', textDecoration: 'none' }}>
            🔍 Search & Merchandising
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Sticky Header Toolbar */}
        <header style={{ height: '64px', borderBottom: '1px solid #1F2937', backgroundColor: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', position: 'sticky', top: 0, zIndex: 10 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#F3F4F6' }}>Products & Catalog Studio</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button style={{ backgroundColor: '#1F2937', color: '#D1D5DB', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              📥 Import CSV
            </button>
            <button style={{ backgroundColor: '#1F2937', color: '#D1D5DB', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              📤 Export CSV
            </button>
            <button style={{ backgroundColor: '#2563EB', color: '#FFF', border: 'none', borderRadius: '6px', padding: '0.5rem 1.25rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>
              + Add Product
            </button>
          </div>
        </header>

        {/* Body Container */}
        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          {/* Product Statistics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>Total Products</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F9FAFB', marginTop: '0.25rem' }}>14,890</div>
            </div>
            <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>Active SKUs</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>13,420</div>
            </div>
            <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>Low Stock Alert</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F59E0B', marginTop: '0.25rem' }}>42 Items</div>
            </div>
            <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>Out of Stock</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#EF4444', marginTop: '0.25rem' }}>18 Items</div>
            </div>
            <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>Catalog Valuation</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#60A5FA', marginTop: '0.25rem' }}>$4.28 M</div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search products by title, SKU, or tag..."
              style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#F9FAFB', fontSize: '0.85rem', minWidth: '280px', outline: 'none' }}
            />
            <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
              <option>All Categories</option>
              <option>Juices & Elixirs</option>
              <option>Supplements</option>
              <option>Personal Care & Tailam</option>
            </select>
            <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
              <option>All Brands</option>
              <option>Kalyan Ayurvedic</option>
              <option>Kalyan Beauty</option>
            </select>
            <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
              <option>All Statuses</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
            <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
              <option>All Stock Levels</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>

          {/* Bulk Actions Bar */}
          <div style={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '6px', padding: '0.65rem 1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <div style={{ color: '#94A3B8' }}>2 products selected</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{ backgroundColor: '#334155', color: '#F1F5F9', border: 'none', borderRadius: '4px', padding: '0.35rem 0.75rem', cursor: 'pointer' }}>Update Inventory</button>
              <button style={{ backgroundColor: '#334155', color: '#F1F5F9', border: 'none', borderRadius: '4px', padding: '0.35rem 0.75rem', cursor: 'pointer' }}>Assign Category</button>
              <button style={{ backgroundColor: '#7F1D1D', color: '#FEE2E2', border: 'none', borderRadius: '4px', padding: '0.35rem 0.75rem', cursor: 'pointer' }}>Delete Selected</button>
            </div>
          </div>

          {/* Product Data Table */}
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
                  <th style={{ padding: '0.75rem' }}>Discount</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem' }}>Rating</th>
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
                      {p.inventoryStatus === 'IN_STOCK' && (
                        <span style={{ backgroundColor: '#065F46', color: '#A7F3D0', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                          {p.inventory} in stock
                        </span>
                      )}
                      {p.inventoryStatus === 'LOW_STOCK' && (
                        <span style={{ backgroundColor: '#92400E', color: '#FDE68A', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                          {p.inventory} (Low Stock)
                        </span>
                      )}
                      {p.inventoryStatus === 'OUT_OF_STOCK' && (
                        <span style={{ backgroundColor: '#991B1B', color: '#FCA5A5', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{p.price}</td>
                    <td style={{ padding: '0.75rem', color: '#34D399' }}>{p.discount}</td>
                    <td style={{ padding: '0.75rem' }}>
                      {p.status === 'ACTIVE' && <span style={{ color: '#10B981', fontWeight: 'bold' }}>● Active</span>}
                      {p.status === 'DRAFT' && <span style={{ color: '#F59E0B', fontWeight: 'bold' }}>● Draft</span>}
                      {p.status === 'ARCHIVED' && <span style={{ color: '#6B7280', fontWeight: 'bold' }}>● Archived</span>}
                    </td>
                    <td style={{ padding: '0.75rem', color: '#FBBF24' }}>★ {p.rating}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', color: '#60A5FA', fontSize: '0.8rem', cursor: 'pointer' }}>
                        <span>Edit</span>
                        <span>Duplicate</span>
                        <span style={{ color: '#EF4444' }}>Delete</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
