/**
 * SynoCommerce Multi-Store & Multi-Brand Studio UI
 * @module apps/admin/src/app/multi-store/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminMultiStorePage() {
  const stores = [
    { id: 'STORE-001', name: 'Kalyan Bhilai Store', brand: 'Kalyan Pure Ayurvedic', region: 'India (CG)', domain: 'bhilai.kalyanayurvedic.com', currency: 'INR (₹)', revenue: '$210,000.00', status: 'ACTIVE' },
    { id: 'STORE-002', name: 'Raipur Hub Store', brand: 'Kalyan Pure Ayurvedic', region: 'India (CG)', domain: 'raipur.kalyanayurvedic.com', currency: 'INR (₹)', revenue: '$145,000.00', status: 'ACTIVE' },
    { id: 'STORE-003', name: 'Syno Global US', brand: 'Syno Global', region: 'United States', domain: 'store.synocommerce.com', currency: 'USD ($)', revenue: '$127,950.00', status: 'ACTIVE' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Multi-Store & Global Brand Management"
      actions={
        <>
          <Button variant="secondary">📥 Import Stores</Button>
          <Button variant="secondary">⚡ Provision Store</Button>
          <Button variant="primary">+ Create Store</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Stores" value="8 Stores" variant="info" />
        <StatCard title="Active Stores" value="7 Active" variant="success" />
        <StatCard title="Countries Served" value="14 Nations" variant="info" />
        <StatCard title="Currencies" value="6 Currencies" variant="info" />
        <StatCard title="Domains" value="12 Domains" variant="info" />
        <StatCard title="Revenue Today" value="$482,950.00" change="+18.4%" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Navigation</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>🏬 All Stores (8)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🏷️ Brands (3)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🌍 Regions (4)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🌐 Domains (12)</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Storefront</th>
                <th style={{ padding: '0.75rem' }}>Brand</th>
                <th style={{ padding: '0.75rem' }}>Domain</th>
                <th style={{ padding: '0.75rem' }}>Revenue Today</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>{s.name}</td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA' }}>{s.brand}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{s.domain}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#34D399' }}>{s.revenue}</td>
                  <td style={{ padding: '0.75rem' }}><Badge variant="success">Active</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Store Health</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>SSL Status</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>Active (Auto-renewed)</div>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>CDN Edge Network</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>Cloudflare Edge</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
