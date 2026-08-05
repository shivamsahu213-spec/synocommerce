/**
 * Admin Dashboard Mobile App Control Center
 * @module apps/admin/app/mobile-app/page
 */

import React from 'react';

export default function AdminMobileAppPage() {
  const appMetrics = [
    { platform: 'iOS (iPhone & iPad)', activeUsers: '42,190', conversion: '5.2%', crashFreeRate: '99.98%' },
    { platform: 'Android (Phone & Tablet)', activeUsers: '78,410', conversion: '4.6%', crashFreeRate: '99.94%' },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #1F2937', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#60A5FA', margin: 0 }}>Mobile Applications Control Center</h1>
        <p style={{ color: '#9CA3AF', margin: '0.25rem 0 0 0' }}>Live iOS, Android, iPad, Foldables, and Tablet Production Monitoring</p>
      </header>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Total Active App Users</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>120,600</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Push Notification CTR</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6' }}>19.4%</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Apple & Google Pay Usage</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#34D399' }}>68.2%</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>App Crash Free Rate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F59E0B' }}>99.96%</div>
        </div>
      </div>

      {/* Platform Table */}
      <section style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem', color: '#F3F4F6' }}>Platform Performance Breakdown</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}>Platform</th>
              <th style={{ padding: '0.75rem' }}>Active DAU</th>
              <th style={{ padding: '0.75rem' }}>Checkout Conversion</th>
              <th style={{ padding: '0.75rem' }}>Crash Free Metric</th>
            </tr>
          </thead>
          <tbody>
            {appMetrics.map((m) => (
              <tr key={m.platform} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#93C5FD' }}>{m.platform}</td>
                <td style={{ padding: '0.75rem' }}>{m.activeUsers}</td>
                <td style={{ padding: '0.75rem', color: '#10B981' }}>{m.conversion}</td>
                <td style={{ padding: '0.75rem', color: '#34D399' }}>{m.crashFreeRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
