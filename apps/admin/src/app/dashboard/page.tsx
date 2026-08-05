/**
 * SynoCommerce Executive Dashboard (Refactored to Design System)
 * @module apps/admin/src/app/dashboard/page
 */

import React from 'react';
import { AppLayout, Button, StatCard } from '../../components/design-system';

export default function EnterpriseDashboardPage() {
  const kpis = [
    { title: 'Total Revenue', value: '$1,482,950.00', change: '+14.2%', variant: 'success' as const, subtext: 'vs last 30 days' },
    { title: 'Total Orders', value: '18,420', change: '+8.4%', variant: 'success' as const, subtext: '98.2% fulfilled' },
    { title: 'Active Customers', value: '12,840', change: '+12.1%', variant: 'success' as const, subtext: '3,410 repeat buyers' },
    { title: 'Conversion Rate', value: '3.84%', change: '+0.4%', variant: 'success' as const, subtext: 'Omnichannel aggregate' },
    { title: 'Average Order Value (AOV)', value: '$162.40', change: '+3.2%', variant: 'success' as const, subtext: 'Cart upsell active' },
    { title: 'Refund Rate', value: '0.38%', change: '-0.15%', variant: 'success' as const, subtext: 'Ultra low RMA rate' },
  ];

  const recentOrders = [
    { id: 'ORD-9841', customer: 'Vaidya Rajesh Sharma', store: 'Kalyan Ayurvedic Bhilai', amount: '$420.00', status: 'PAID & SHIPPED' },
    { id: 'ORD-9840', customer: 'Priya Patel', store: 'Online Storefront', amount: '$185.50', status: 'PROCESSING' },
    { id: 'ORD-9839', customer: 'Anita Roy', store: 'Raipur Hub POS', amount: '$890.00', status: 'PAID & DELIVERED' },
    { id: 'ORD-9838', customer: 'Aarav Gupta', store: 'Mobile App (iOS)', amount: '$124.00', status: 'FULFILLED' },
  ];

  const aiInsights = [
    '⚡ Demand Surge: Triphala Juice sales in Raipur region increased by 28% after local Vaidya campaign.',
    '🎯 Upsell Opportunity: Adding Kumkumadi Tailam bundle to cart increases AOV by $34.50.',
    '⚠️ Inventory Warning: Kalyan Organic Chyawanprash stock will deplete in 4 days at current velocity.',
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Enterprise Command Center"
      actions={<Button variant="primary">+ Create Campaign</Button>}
    >
      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {kpis.map((kpi, i) => (
          <StatCard key={i} title={kpi.title} value={kpi.value} change={kpi.change} subtext={kpi.subtext} variant={kpi.variant} />
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600', color: '#F3F4F6' }}>Revenue & Order Trajectory (Last 30 Days)</h3>
          <div style={{ height: '200px', backgroundColor: '#1F2937', borderRadius: '6px', display: 'flex', alignItems: 'flex-end', padding: '1rem', gap: '0.75rem' }}>
            {[40, 55, 35, 70, 85, 60, 95, 110, 90, 120, 140, 130, 160, 150, 180].map((val, idx) => (
              <div key={idx} style={{ flex: 1, height: `${val}px`, backgroundColor: '#3B82F6', borderRadius: '4px 4px 0 0', opacity: 0.85 }} />
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600', color: '#F3F4F6' }}>Sales by Category</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                <span>Juices & Elixirs</span>
                <span style={{ fontWeight: 'bold', color: '#60A5FA' }}>42% ($622k)</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#1F2937', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '42%', height: '100%', backgroundColor: '#3B82F6' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                <span>Supplements</span>
                <span style={{ fontWeight: 'bold', color: '#10B981' }}>34% ($504k)</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#1F2937', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '34%', height: '100%', backgroundColor: '#10B981' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders & AI Insights Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600', color: '#F3F4F6' }}>Recent Omnichannel Orders</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.5rem' }}>Order</th>
                <th style={{ padding: '0.5rem' }}>Customer</th>
                <th style={{ padding: '0.5rem' }}>Channel</th>
                <th style={{ padding: '0.5rem' }}>Amount</th>
                <th style={{ padding: '0.5rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 'bold', color: '#60A5FA' }}>{o.id}</td>
                  <td style={{ padding: '0.5rem' }}>{o.customer}</td>
                  <td style={{ padding: '0.5rem', color: '#9CA3AF' }}>{o.store}</td>
                  <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{o.amount}</td>
                  <td style={{ padding: '0.5rem', color: '#10B981' }}>{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600', color: '#F3F4F6' }}>🤖 AI Operational Insights</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {aiInsights.map((insight, idx) => (
              <div key={idx} style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.85rem', color: '#D1D5DB', borderLeft: '3px solid #3B82F6' }}>
                {insight}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
