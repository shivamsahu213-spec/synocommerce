/**
 * Admin Dashboard Migration Center Control Center
 * @module apps/admin/app/migration-center/page
 */

import React from 'react';

export default function AdminMigrationCenterPage() {
  const activeMigrations = [
    { jobId: 'MIG_SHOPIFY_101', source: 'Shopify Plus', entities: 'Products, Customers, Orders', records: '48,910', status: 'COMPLETED', time: '14m 20s' },
    { jobId: 'MIG_WOO_202', source: 'WooCommerce', entities: 'Products, Categories', records: '12,450', status: 'IN_PROGRESS (84%)', time: '5m 10s' },
    { jobId: 'MIG_MAGENTO_303', source: 'Magento 2 / Adobe Commerce', entities: 'Customers, Addresses, B2B Companies', records: '92,100', status: 'COMPLETED', time: '32m 45s' },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #1F2937', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#60A5FA', margin: 0 }}>Enterprise Migration Toolkit Center</h1>
        <p style={{ color: '#9CA3AF', margin: '0.25rem 0 0 0' }}>Shopify Transporter, Cart2Cart & Adobe Commerce Grade Data Migration</p>
      </header>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Supported Platforms</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>16 Connectors</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Total Migrated Records</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6' }}>153,460</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Validation Pass Rate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#34D399' }}>99.98%</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Rollback Snapshots Ready</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F59E0B' }}>100% Protected</div>
        </div>
      </div>

      {/* Active Migrations Table */}
      <section style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem', color: '#F3F4F6' }}>Recent Platform Migrations</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}>Job ID</th>
              <th style={{ padding: '0.75rem' }}>Source Platform</th>
              <th style={{ padding: '0.75rem' }}>Migrated Entities</th>
              <th style={{ padding: '0.75rem' }}>Record Count</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
              <th style={{ padding: '0.75rem' }}>Duration</th>
            </tr>
          </thead>
          <tbody>
            {activeMigrations.map((m) => (
              <tr key={m.jobId} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#93C5FD' }}>{m.jobId}</td>
                <td style={{ padding: '0.75rem' }}>{m.source}</td>
                <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{m.entities}</td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{m.records}</td>
                <td style={{ padding: '0.75rem', color: '#10B981' }}>{m.status}</td>
                <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{m.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
