/**
 * Admin Dashboard Marketplace Portal Management Page
 * @module apps/admin/app/marketplace-portal/page
 */

import React from 'react';

export default function AdminMarketplacePortalPage() {
  const topApps = [
    { name: 'Razorpay Enterprise Gateway', publisher: 'Kalyan Software Labs', category: 'PAYMENTS', installs: '1,420', price: '$49.00' },
    { name: 'Shiprocket Multi-Carrier Logistics', publisher: 'Shiprocket Inc', category: 'SHIPPING', installs: '2,890', price: 'FREE' },
    { name: 'Kalyan Ayurvedic Luxury Theme', publisher: 'Kalyan Studio', category: 'THEMES', installs: '850', price: '$99.00' },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #1F2937', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#60A5FA', margin: 0 }}>SynoCommerce App & Extension Marketplace</h1>
        <p style={{ color: '#9CA3AF', margin: '0.25rem 0 0 0' }}>Shopify App Store & Atlassian Marketplace Grade Extension Ecosystem</p>
      </header>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Total Published Apps</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>240 Plugins</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Verified Developers</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6' }}>85 Publishers</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Monthly Gross App Sales</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#34D399' }}>$48,920.00</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>80/20 Developer Payouts</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F59E0B' }}>$39,136.00</div>
        </div>
      </div>

      {/* Top Apps Table */}
      <section style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem', color: '#F3F4F6' }}>Top Marketplace Apps</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}>App Name</th>
              <th style={{ padding: '0.75rem' }}>Publisher</th>
              <th style={{ padding: '0.75rem' }}>Category</th>
              <th style={{ padding: '0.75rem' }}>Active Installs</th>
              <th style={{ padding: '0.75rem' }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {topApps.map((a) => (
              <tr key={a.name} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#93C5FD' }}>{a.name}</td>
                <td style={{ padding: '0.75rem' }}>{a.publisher}</td>
                <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{a.category}</td>
                <td style={{ padding: '0.75rem', color: '#10B981' }}>{a.installs}</td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{a.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
