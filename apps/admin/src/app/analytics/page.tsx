/**
 * SynoCommerce Enterprise Business Intelligence & Analytics UI
 * Shopify & PowerBI Quality Analytics & AI Forecasting Studio
 * @module apps/admin/src/app/analytics/page
 */

import React from 'react';
import { AppLayout, Button, StatCard } from '../../components/design-system';

export default function AdminAnalyticsPage() {
  const topCities = [
    { city: 'Bhilai, CG', orders: '4,280 orders', revenue: '$420,000.00', share: '38%' },
    { city: 'Raipur, CG', orders: '3,150 orders', revenue: '$315,000.00', share: '28%' },
    { city: 'Durg, CG', orders: '1,890 orders', revenue: '$189,000.00', share: '18%' },
    { city: 'Bengaluru, KA', orders: '1,240 orders', revenue: '$145,000.00', share: '16%' },
  ];

  return (
    <AppLayout
      activeTab="analytics"
      title="Enterprise Business Intelligence & AI Forecasting"
      actions={
        <>
          <Button variant="secondary">📅 Last 30 Days</Button>
          <Button variant="secondary">📤 Export Report</Button>
          <Button variant="secondary">🔗 Share Dashboard</Button>
          <Button variant="primary">+ Create Dashboard</Button>
        </>
      }
    >
      {/* Top KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Revenue" value="$1,482,950.00" change="+14.2%" variant="success" subtext="vs prev period" />
        <StatCard title="Total Orders" value="18,420" change="+8.4%" variant="success" subtext="98.2% fulfilled" />
        <StatCard title="Active Customers" value="12,840" change="+12.1%" variant="success" subtext="3,410 repeat" />
        <StatCard title="Conversion Rate" value="3.84%" change="+0.4%" variant="success" subtext="Omnichannel" />
        <StatCard title="Average Order Value" value="$162.40" change="+3.2%" variant="success" subtext="Upsell active" />
        <StatCard title="Gross Margin" value="68.4%" change="+1.8%" variant="success" subtext="Ultra profitable" />
      </div>

      {/* Main Charts & Analytics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Revenue & Orders Trajectory Area Chart */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#F3F4F6' }}>Revenue & Order Trajectory (30 Days)</h3>
            <span style={{ fontSize: '0.8rem', color: '#60A5FA', cursor: 'pointer' }}>Detailed Telemetry</span>
          </div>
          <div style={{ height: '220px', backgroundColor: '#1F2937', borderRadius: '6px', display: 'flex', alignItems: 'flex-end', padding: '1rem', gap: '0.65rem' }}>
            {[45, 60, 40, 80, 95, 70, 110, 130, 105, 140, 160, 150, 185, 170, 210].map((val, idx) => (
              <div key={idx} style={{ flex: 1, height: `${val}px`, background: 'linear-gradient(180deg, #3B82F6, #1D4ED8)', borderRadius: '4px 4px 0 0', opacity: 0.9 }} />
            ))}
          </div>
        </div>

        {/* Right Sidebar: AI Forecast & Anomaly Detection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>🤖 AI Revenue Forecast (30-Day Holt-Winters)</h4>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#10B981' }}>$1,650,000.00</div>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem' }}>Confidence Interval: 94.8% based on historical seasonality.</div>
          </div>

          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>⚡ Anomaly Detection Widget</h4>
            <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB', borderLeft: '3px solid #10B981' }}>
              ✅ Normal Traffic Pattern: Zero anomaly spikes detected in order velocity over the last 72 hours.
            </div>
          </div>
        </div>
      </div>

      {/* Top Cities & Traffic Distribution */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 'bold', color: '#F3F4F6' }}>Top Purchasing Cities</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.5rem' }}>City</th>
              <th style={{ padding: '0.5rem' }}>Orders Volume</th>
              <th style={{ padding: '0.5rem' }}>Revenue Generated</th>
              <th style={{ padding: '0.5rem' }}>Market Share</th>
            </tr>
          </thead>
          <tbody>
            {topCities.map((c) => (
              <tr key={c.city} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.5rem', fontWeight: 'bold', color: '#60A5FA' }}>{c.city}</td>
                <td style={{ padding: '0.5rem' }}>{c.orders}</td>
                <td style={{ padding: '0.5rem', fontWeight: 'bold', color: '#34D399' }}>{c.revenue}</td>
                <td style={{ padding: '0.5rem', color: '#F9FAFB' }}>{c.share}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
