/**
 * SynoCommerce Global Markets & Localization Studio UI
 * @module apps/admin/src/app/markets/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminMarketsPage() {
  const marketsList = [
    { id: 'MKT-001', name: 'India Domestic (Bhilai/Raipur HQ)', countries: 'India (IN)', languages: 'English, Hindi', currency: 'INR (₹)', rate: '1.00 (Base)', status: 'ACTIVE' },
    { id: 'MKT-002', name: 'North America Market', countries: 'USA, Canada', languages: 'English, Spanish', currency: 'USD ($)', rate: '1.00 USD', status: 'ACTIVE' },
    { id: 'MKT-003', name: 'European Union Market', countries: 'Germany, France, Spain', languages: 'English, German, French', currency: 'EUR (€)', rate: '0.92 EUR', status: 'ACTIVE' },
    { id: 'MKT-004', name: 'Middle East GCC', countries: 'UAE, Saudi Arabia', languages: 'Arabic, English', currency: 'AED (د.إ)', rate: '3.67 AED', status: 'ACTIVE' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Global Markets & Multi-Currency Localization"
      actions={
        <>
          <Button variant="secondary">💱 Sync Exchange Rates</Button>
          <Button variant="secondary">🌐 Add Language</Button>
          <Button variant="primary">+ Create Market</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Active Markets" value="4 Markets" variant="info" />
        <StatCard title="Target Countries" value="14 Nations" variant="info" />
        <StatCard title="Supported Languages" value="6 Languages" variant="info" />
        <StatCard title="Active Currencies" value="5 Currencies" variant="info" />
        <StatCard title="Exchange Rate Sync" value="Real-time FX" variant="success" />
        <StatCard title="Tax Regions" value="18 Rules" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Localization Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>🌐 Global Markets (4)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>💱 Currency Conversion</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🚚 Regional Shipping Zones</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🏛️ Tax & VAT Calculations</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Market Name</th>
                <th style={{ padding: '0.75rem' }}>Countries</th>
                <th style={{ padding: '0.75rem' }}>Languages</th>
                <th style={{ padding: '0.75rem' }}>Currency & Rate</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {marketsList.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>{m.name}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{m.countries}</td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA' }}>{m.languages}</td>
                  <td style={{ padding: '0.75rem', color: '#34D399', fontWeight: 'bold' }}>{m.currency} ({m.rate})</td>
                  <td style={{ padding: '0.75rem' }}><Badge variant="success">Active</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>FX Rate Telemetry</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Primary FX Provider</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>European Central Bank API</div>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Auto-Rounding Rule</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#60A5FA', marginTop: '0.25rem' }}>Charm Pricing (.99)</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
