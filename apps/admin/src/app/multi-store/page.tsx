/**
 * SynoCommerce Enterprise Multi-Store & Multi-Brand Management UI
 * Shopify Plus Organization, Adobe Commerce Store Manager & CommerceTools Quality Studio
 * @module apps/admin/src/app/multi-store/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminMultiStorePage() {
  const storesList = [
    {
      id: 'STORE-001',
      name: 'Kalyan Bhilai Flagship',
      brand: 'Kalyan Pure Ayurvedic',
      region: 'APAC / India (CG)',
      domain: 'bhilai.kalyanayurvedic.com',
      currency: 'INR (₹) / USD ($)',
      revenueToday: '$210,000.00',
      users: 14,
      status: 'ACTIVE',
      logo: '🌿',
    },
    {
      id: 'STORE-002',
      name: 'Raipur Central Hub Store',
      brand: 'Kalyan Pure Ayurvedic',
      region: 'APAC / India (CG)',
      domain: 'raipur.kalyanayurvedic.com',
      currency: 'INR (₹)',
      revenueToday: '$145,000.00',
      users: 8,
      status: 'ACTIVE',
      logo: '🏪',
    },
    {
      id: 'STORE-003',
      name: 'SynoCommerce Global US Store',
      brand: 'Syno Global',
      region: 'North America (US)',
      domain: 'store.synocommerce.com',
      currency: 'USD ($)',
      revenueToday: '$127,950.00',
      users: 12,
      status: 'ACTIVE',
      logo: '🌐',
    },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Multi-Store & Global Brand Architecture"
      actions={
        <>
          <Button variant="secondary">📥 Import Stores</Button>
          <Button variant="secondary">📤 Export CSV</Button>
          <Button variant="secondary">⚡ Provision Store</Button>
          <Button variant="primary">+ Create Store</Button>
        </>
      }
    >
      {/* Top KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Stores" value="8 Stores" variant="info" />
        <StatCard title="Active Stores" value="7 Active" variant="success" />
        <StatCard title="Countries Served" value="14 Nations" variant="info" />
        <StatCard title="Active Currencies" value="6 Currencies" variant="info" />
        <StatCard title="Managed Domains" value="12 Domains" variant="info" />
        <StatCard title="Total Revenue Today" value="$482,950.00" change="+18.4%" variant="success" />
      </div>

      {/* 3-Column Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem', height: 'calc(100vh - 140px)' }}>
        {/* Left Sidebar: Brands & Regions */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Organization Structure</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>
              🏬 All Stores (8)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🏷️ Brand Portfolios (3)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🌍 Global Regions (4)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🌐 Custom Domains (12)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              💱 Multi-Currency Rules (6)
            </div>
          </div>
        </div>

        {/* Center Panel: Enterprise Stores Table */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Storefront</th>
                <th style={{ padding: '0.75rem' }}>Brand & Region</th>
                <th style={{ padding: '0.75rem' }}>Domain</th>
                <th style={{ padding: '0.75rem' }}>Today's Revenue</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {storesList.map((store) => (
                <tr key={store.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>
                    <span style={{ marginRight: '0.5rem' }}>{store.logo}</span> {store.name}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ color: '#60A5FA', fontWeight: 'bold' }}>{store.brand}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{store.region}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{store.domain}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#34D399' }}>{store.revenueToday}</td>
                  <td style={{ padding: '0.75rem' }}><Badge variant="success">Active</Badge></td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', color: '#60A5FA', cursor: 'pointer' }}>
                      <span>Open Admin</span>
                      <span>Clone</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Sidebar: Selected Store Health */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Store Health Telemetry</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>SSL Certificate</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>Active (Auto-Renewed)</div>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>CDN Edge Network</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>Cloudflare Enterprise Edge</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
