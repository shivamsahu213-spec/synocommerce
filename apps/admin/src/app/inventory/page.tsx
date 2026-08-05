/**
 * SynoCommerce Enterprise Inventory & Warehouses Management UI
 * Shopify & Apple Quality Production Multi-Location Stock Studio
 * @module apps/admin/src/app/inventory/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminInventoryPage() {
  const inventoryItems = [
    {
      sku: 'SKU-TRIPHALA-1L',
      productName: 'Kalyan Triphala Juice 1L',
      category: 'Juices & Elixirs',
      warehouse: 'Bhilai Central Hub',
      available: 2400,
      reserved: 120,
      incoming: 500,
      reorderLevel: 300,
      status: 'IN_STOCK',
      updated: '10 mins ago',
      image: '🍵',
    },
    {
      sku: 'SKU-ASHWA-60',
      productName: 'Kalyan Ashwagandha Capsules 60s',
      category: 'Supplements',
      warehouse: 'Raipur Logistics Hub',
      available: 850,
      reserved: 45,
      incoming: 200,
      reorderLevel: 150,
      status: 'IN_STOCK',
      updated: '25 mins ago',
      image: '🌿',
    },
    {
      sku: 'SKU-CHYAWAN-500',
      productName: 'Kalyan Organic Chyawanprash 500g',
      category: 'Supplements',
      warehouse: 'Bhilai Central Hub',
      available: 120,
      reserved: 30,
      incoming: 1000,
      reorderLevel: 250,
      status: 'LOW_STOCK',
      updated: '1 hour ago',
      image: '🍯',
    },
    {
      sku: 'SKU-KUMKUM-30ML',
      productName: 'Kalyan Kumkumadi Night Serum 30ml',
      category: 'Personal Care & Tailam',
      warehouse: 'Durg Distribution Hub',
      available: 0,
      reserved: 0,
      incoming: 300,
      reorderLevel: 100,
      status: 'OUT_OF_STOCK',
      updated: '3 hours ago',
      image: '✨',
    },
  ];

  return (
    <AppLayout
      activeTab="inventory"
      title="Multi-Location Inventory & Stock Studio"
      actions={
        <>
          <Button variant="secondary">📥 Receive Stock</Button>
          <Button variant="secondary">🚚 Transfer Stock</Button>
          <Button variant="secondary">📤 Export CSV</Button>
          <Button variant="primary">+ Add Adjustment</Button>
        </>
      }
    >
      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total SKUs" value="14,890" />
        <StatCard title="In Stock" value="13,420" variant="success" />
        <StatCard title="Low Stock Alert" value="42 SKUs" variant="warning" />
        <StatCard title="Out of Stock" value="18 SKUs" variant="danger" />
        <StatCard title="Inventory Value" value="$4.28 M" variant="success" />
        <StatCard title="Pending Transfers" value="6 Shipments" variant="info" />
      </div>

      {/* Filter Bar */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search SKU, product title, or warehouse location..."
          style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#F9FAFB', fontSize: '0.85rem', minWidth: '280px', outline: 'none' }}
        />
        <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
          <option>Warehouse: All Locations</option>
          <option>Bhilai Central Hub</option>
          <option>Raipur Logistics Hub</option>
          <option>Durg Distribution Hub</option>
        </select>
        <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
          <option>Stock Status: All</option>
          <option>In Stock</option>
          <option>Low Stock Alert</option>
          <option>Out of Stock</option>
        </select>
      </div>

      {/* Bulk Action Toolbar */}
      <div style={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '6px', padding: '0.65rem 1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
        <div style={{ color: '#94A3B8' }}>2 SKUs selected</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button style={{ backgroundColor: '#334155', color: '#F1F5F9', border: 'none', borderRadius: '4px', padding: '0.35rem 0.75rem', cursor: 'pointer' }}>Update Stock</button>
          <button style={{ backgroundColor: '#334155', color: '#F1F5F9', border: 'none', borderRadius: '4px', padding: '0.35rem 0.75rem', cursor: 'pointer' }}>Initiate Transfer</button>
          <button style={{ backgroundColor: '#2563EB', color: '#FFF', border: 'none', borderRadius: '4px', padding: '0.35rem 0.75rem', cursor: 'pointer' }}>Print Barcode Labels</button>
        </div>
      </div>

      {/* Table & Right Sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '1.5rem' }}>
        {/* Inventory Data Table */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}><input type="checkbox" /></th>
                <th style={{ padding: '0.75rem' }}>SKU</th>
                <th style={{ padding: '0.75rem' }}>Product Name</th>
                <th style={{ padding: '0.75rem' }}>Warehouse</th>
                <th style={{ padding: '0.75rem' }}>Available</th>
                <th style={{ padding: '0.75rem' }}>Reserved</th>
                <th style={{ padding: '0.75rem' }}>Incoming</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.sku} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem' }}><input type="checkbox" /></td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#60A5FA' }}>{item.sku}</td>
                  <td style={{ padding: '0.75rem', fontWeight: '600', color: '#F3F4F6' }}>
                    <span style={{ marginRight: '0.5rem' }}>{item.image}</span> {item.productName}
                  </td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{item.warehouse}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{item.available} units</td>
                  <td style={{ padding: '0.75rem', color: '#F59E0B' }}>{item.reserved}</td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA' }}>+{item.incoming}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {item.status === 'IN_STOCK' && <Badge variant="success">In Stock</Badge>}
                    {item.status === 'LOW_STOCK' && <Badge variant="warning">Low Stock</Badge>}
                    {item.status === 'OUT_OF_STOCK' && <Badge variant="danger">Out of Stock</Badge>}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', color: '#60A5FA', fontSize: '0.8rem', cursor: 'pointer' }}>
                      <span>Adjust</span>
                      <span>Transfer</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Sidebar Widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>🤖 AI Inventory Optimization</h4>
            <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB', borderLeft: '3px solid #F59E0B' }}>
              ⚡ Reorder Alert: Transfer 400 units of Triphala Juice from Bhilai Central to Raipur Hub to prevent stockout ahead of festival sale.
            </div>
          </div>

          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>🚚 Warehouse Utilization</h4>
            <div style={{ fontSize: '0.85rem', color: '#D1D5DB' }}>
              <strong>Bhilai Central Hub</strong> - 84% Capacity (42,000 / 50,000 units)
            </div>
            <div style={{ fontSize: '0.85rem', color: '#D1D5DB', marginTop: '0.35rem' }}>
              <strong>Raipur Logistics Hub</strong> - 62% Capacity (18,600 / 30,000 units)
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
