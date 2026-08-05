/**
 * SynoCommerce Enterprise Reports Center UI
 * Shopify Reports, Power BI Report Library & Oracle Analytics Quality BI Portal
 * @module apps/admin/src/app/reports/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminReportsPage() {
  const reportsList = [
    {
      id: 'REP-001',
      name: 'Omnichannel Sales by Region (30-Day)',
      category: 'Sales & Revenue',
      owner: 'Shivam Sahu (BI Admin)',
      lastRun: '12 mins ago',
      schedule: 'DAILY @ 08:00 AM IST',
      status: 'READY',
    },
    {
      id: 'REP-002',
      name: 'Bhilai & Raipur Inventory Stockouts',
      category: 'Inventory',
      owner: 'Ankit Mishra (Retail Ops)',
      lastRun: '1 hour ago',
      schedule: 'HOURLY CRON',
      status: 'READY',
    },
    {
      id: 'REP-003',
      name: 'VIP Customer LTV & Cohort Retention',
      category: 'Customers',
      owner: 'Analytics Team',
      lastRun: 'Yesterday',
      schedule: 'WEEKLY (MON)',
      status: 'READY',
    },
    {
      id: 'REP-004',
      name: 'Monsoon Promo Discount ROI',
      category: 'Marketing',
      owner: 'Marketing Team',
      lastRun: '3 hours ago',
      schedule: 'ON-DEMAND',
      status: 'READY',
    },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Enterprise Reports Center & BI Exporter"
      actions={
        <>
          <Button variant="secondary">⏰ Schedule Report</Button>
          <Button variant="secondary">📤 Export CSV</Button>
          <Button variant="secondary">📥 Import Template</Button>
          <Button variant="primary">+ Create Report</Button>
        </>
      }
    >
      {/* Top KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Available Reports" value="48 Reports" variant="info" />
        <StatCard title="Scheduled Jobs" value="12 Active" variant="info" />
        <StatCard title="Generated Today" value="184 Reports" change="+14.2%" variant="success" />
        <StatCard title="Exports Today" value="42 Downloads" variant="success" />
        <StatCard title="Top Report" value="Sales by Region" variant="success" />
        <StatCard title="Avg Gen Time" value="1.2 s" variant="success" />
      </div>

      {/* 3-Column Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Left Sidebar: Categories */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Report Categories</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>
              📊 Sales & Revenue (14)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              📦 Inventory & Stock (8)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              👥 Customer Cohorts (6)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              📢 Marketing ROI (10)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🤖 AI Executive Insights (5)
            </div>
          </div>
        </div>

        {/* Center Panel: Reports Table */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Report Name</th>
                <th style={{ padding: '0.75rem' }}>Owner</th>
                <th style={{ padding: '0.75rem' }}>Schedule</th>
                <th style={{ padding: '0.75rem' }}>Last Run</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportsList.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>
                    <div>{r.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 'normal' }}>{r.category}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{r.owner}</td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA', fontWeight: 'bold' }}>{r.schedule}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{r.lastRun}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', color: '#60A5FA', cursor: 'pointer' }}>
                      <span>Run</span>
                      <span>Export</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Sidebar: Recent Activity & Favorites */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Export Queue</h3>
          <div style={{ fontSize: '0.8rem', color: '#D1D5DB' }}>
            📥 <strong>Sales_by_Region_Aug2026.pdf</strong> (Ready)
          </div>
          <div style={{ fontSize: '0.8rem', color: '#D1D5DB', marginTop: '0.35rem' }}>
            📥 <strong>Inventory_Stockouts.csv</strong> (Ready)
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
