/**
 * Admin Dashboard Mobile SDK Management Page
 * @module apps/admin/app/mobile-sdk/page
 */

import React from 'react';

export default function AdminMobileSdkPage() {
  const sdkApps = [
    { name: 'Kalyan Ayurvedic iOS App', platform: 'IOS (Swift)', version: 'v1.4.0', activeUsers: '14,280', apiKey: 'syno_m_live_ios_8812' },
    { name: 'Kalyan Ayurvedic Android App', platform: 'ANDROID (Kotlin)', version: 'v1.4.2', activeUsers: '28,910', apiKey: 'syno_m_live_and_7719' },
    { name: 'SynoCommerce Flutter App', platform: 'FLUTTER', version: 'v1.2.0', activeUsers: '8,450', apiKey: 'syno_m_live_flt_1102' },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #1F2937', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#60A5FA', margin: 0 }}>Mobile SDK Platform Center</h1>
        <p style={{ color: '#9CA3AF', margin: '0.25rem 0 0 0' }}>Android, iOS, Flutter, React Native, Expo, Swift, Kotlin SDKs</p>
      </header>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Active Mobile DAU</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>51,640</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Mobile Checkout Conversion</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6' }}>4.8%</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Offline Queue Sync Rate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#34D399' }}>99.9%</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Crash Free Rate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F59E0B' }}>99.95%</div>
        </div>
      </div>

      {/* SDK Apps Table */}
      <section style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem', color: '#F3F4F6' }}>Registered Mobile Client Apps</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}>App Name</th>
              <th style={{ padding: '0.75rem' }}>Platform</th>
              <th style={{ padding: '0.75rem' }}>SDK Version</th>
              <th style={{ padding: '0.75rem' }}>Active Users</th>
              <th style={{ padding: '0.75rem' }}>API Key</th>
            </tr>
          </thead>
          <tbody>
            {sdkApps.map((app) => (
              <tr key={app.apiKey} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#93C5FD' }}>{app.name}</td>
                <td style={{ padding: '0.75rem' }}>{app.platform}</td>
                <td style={{ padding: '0.75rem', color: '#34D399' }}>{app.version}</td>
                <td style={{ padding: '0.75rem', color: '#D1D5DB' }}>{app.activeUsers}</td>
                <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: '#9CA3AF' }}>{app.apiKey}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
