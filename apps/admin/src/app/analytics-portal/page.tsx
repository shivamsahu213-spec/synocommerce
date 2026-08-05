/**
 * Admin Dashboard Business Intelligence Control Center
 * @module apps/admin/app/analytics-portal/page
 */

import React from 'react';

export default function AdminAnalyticsPortalPage() {
  const kpiMetrics = [
    { name: 'Monthly Recurring Revenue (MRR)', value: '$48,920.00', growth: '+12.4%', status: 'ABOVE_TARGET' },
    { name: 'Annual Recurring Revenue (ARR)', value: '$587,040.00', growth: '+14.8%', status: 'ABOVE_TARGET' },
    { name: 'Customer Lifetime Value (LTV)', value: '$420.00', growth: '+8.5%', status: 'ON_TRACK' },
    { name: 'Customer Acquisition Cost (CAC)', value: '$45.00', growth: '-3.2%', status: 'OPTIMIZED' },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #1F2937', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#60A5FA', margin: 0 }}>Business Intelligence & Analytics Control Center</h1>
        <p style={{ color: '#9CA3AF', margin: '0.25rem 0 0 0' }}>Power BI, Tableau & Looker Grade Executive Dashboards and AI Forecasting</p>
      </header>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Active BI Dashboards</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>10 Templates</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Supported Chart Widgets</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6' }}>14 Visualizations</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>30-Day AI Forecasted Sales</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#34D399' }}>$54,200.00</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Scheduled Email Reports</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F59E0B' }}>18 Active</div>
        </div>
      </div>

      {/* KPI Matrix Table */}
      <section style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem', color: '#F3F4F6' }}>Executive KPI Performance</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}>KPI Metric</th>
              <th style={{ padding: '0.75rem' }}>Current Value</th>
              <th style={{ padding: '0.75rem' }}>MoM Growth</th>
              <th style={{ padding: '0.75rem' }}>Target Status</th>
            </tr>
          </thead>
          <tbody>
            {kpiMetrics.map((k) => (
              <tr key={k.name} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#93C5FD' }}>{k.name}</td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>{k.value}</td>
                <td style={{ padding: '0.75rem', color: '#10B981' }}>{k.growth}</td>
                <td style={{ padding: '0.75rem', color: '#34D399' }}>{k.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
