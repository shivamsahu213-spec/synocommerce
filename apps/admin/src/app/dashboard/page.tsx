/**
 * SynoCommerce Enterprise Admin Dashboard
 * Shopify & Apple Quality Premium Analytics & Operations Portal
 * @module apps/admin/src/app/dashboard/page
 */

import React from 'react';

export default function EnterpriseDashboardPage() {
  const kpis = [
    { title: 'Total Revenue', value: '$1,482,950.00', change: '+14.2%', isPositive: true, subtext: 'vs last 30 days' },
    { title: 'Total Orders', value: '18,420', change: '+8.4%', isPositive: true, subtext: '98.2% fulfilled' },
    { title: 'Active Customers', value: '12,840', change: '+12.1%', isPositive: true, subtext: '3,410 repeat buyers' },
    { title: 'Conversion Rate', value: '3.84%', change: '+0.4%', isPositive: true, subtext: 'Omnichannel aggregate' },
    { title: 'Average Order Value (AOV)', value: '$162.40', change: '+3.2%', isPositive: true, subtext: 'Cart upsell active' },
    { title: 'Refund Rate', value: '0.38%', change: '-0.15%', isPositive: true, subtext: 'Ultra low RMA rate' },
  ];

  const recentOrders = [
    { id: 'ORD-9841', customer: 'Vaidya Rajesh Sharma', store: 'Kalyan Ayurvedic Bhilai', amount: '$420.00', status: 'PAID & SHIPPED', date: '2 mins ago' },
    { id: 'ORD-9840', customer: 'Priya Patel', store: 'Online Storefront', amount: '$185.50', status: 'PROCESSING', date: '14 mins ago' },
    { id: 'ORD-9839', customer: 'Anita Roy', store: 'Raipur Hub POS', amount: '$890.00', status: 'PAID & DELIVERED', date: '42 mins ago' },
    { id: 'ORD-9838', customer: 'Aarav Gupta', store: 'Mobile App (iOS)', amount: '$124.00', status: 'FULFILLED', date: '1 hour ago' },
  ];

  const topProducts = [
    { name: 'Kalyan Triphala Juice 1L', sales: '3,840 units', revenue: '$48,000', stock: '2,400 left (In Stock)' },
    { name: 'Kalyan Ashwagandha Gold 60s', sales: '2,910 units', revenue: '$52,380', stock: '850 left (In Stock)' },
    { name: 'Kalyan Organic Chyawanprash 500g', sales: '2,150 units', revenue: '$38,700', stock: '120 left (Low Stock)' },
  ];

  const aiInsights = [
    '⚡ Demand Surge: Triphala Juice sales in Raipur region increased by 28% after local Vaidya campaign.',
    '🎯 Upsell Opportunity: Adding Kumkumadi Tailam bundle to cart increases AOV by $34.50.',
    '⚠️ Inventory Warning: Kalyan Organic Chyawanprash stock will deplete in 4 days at current velocity.',
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', display: 'flex' }}>
      {/* Collapsible Sidebar */}
      <aside style={{ width: '260px', backgroundColor: '#111827', borderRight: '1px solid #1F2937', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#FFF' }}>
            S
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#F3F4F6' }}>SynoCommerce</div>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Enterprise Admin</div>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <a href="/dashboard" style={{ padding: '0.75rem 1rem', borderRadius: '6px', backgroundColor: '#1F2937', color: '#60A5FA', fontWeight: '600', textDecoration: 'none' }}>
            📊 Executive Dashboard
          </a>
          <a href="/analytics" style={{ padding: '0.75rem 1rem', borderRadius: '6px', color: '#9CA3AF', textDecoration: 'none' }}>
            📈 Business Intelligence
          </a>
          <a href="/low-code-portal" style={{ padding: '0.75rem 1rem', borderRadius: '6px', color: '#9CA3AF', textDecoration: 'none' }}>
            🧩 Low-Code App Builder
          </a>
          <a href="/migration-center" style={{ padding: '0.75rem 1rem', borderRadius: '6px', color: '#9CA3AF', textDecoration: 'none' }}>
            🚚 Migration Toolkit
          </a>
          <a href="/search-center" style={{ padding: '0.75rem 1rem', borderRadius: '6px', color: '#9CA3AF', textDecoration: 'none' }}>
            🔍 Search & Merchandising
          </a>
        </nav>

        <div style={{ borderTop: '1px solid #1F2937', paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>
            SS
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#F3F4F6' }}>Shivam Sahu</div>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Chief Architect</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Sticky Top Navigation */}
        <header style={{ height: '64px', borderBottom: '1px solid #1F2937', backgroundColor: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, maxWidth: '480px' }}>
            <input
              type="text"
              placeholder="Search orders, products, customers or AI commands (⌘K)..."
              style={{ width: '100%', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#F9FAFB', fontSize: '0.875rem', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ fontSize: '1.2rem', cursor: 'pointer' }}>🔔</span>
            <span style={{ fontSize: '1.2rem', cursor: 'pointer' }}>🌙</span>
            <div style={{ backgroundColor: '#059669', color: '#ECFDF5', fontSize: '0.75rem', fontWeight: '600', padding: '0.25rem 0.65rem', borderRadius: '9999px' }}>
              ● Live Systems Normal
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#F9FAFB' }}>Enterprise Command Center</h1>
              <p style={{ color: '#9CA3AF', margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>Real-time revenue telemetry, AI inventory alerts & order velocity</p>
            </div>
            <button style={{ backgroundColor: '#2563EB', color: '#FFF', border: 'none', borderRadius: '6px', padding: '0.6rem 1.2rem', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem' }}>
              + Create Campaign
            </button>
          </div>

          {/* KPI Cards Grid (6 Grid Cards) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            {kpis.map((kpi, i) => (
              <div key={i} style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#9CA3AF', fontSize: '0.75rem', fontWeight: '500' }}>{kpi.title}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#F9FAFB', margin: '0.35rem 0' }}>{kpi.value}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem' }}>
                  <span style={{ color: '#10B981', fontWeight: 'bold' }}>{kpi.change}</span>
                  <span style={{ color: '#6B7280' }}>{kpi.subtext}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            {/* Revenue Trend Chart Widget */}
            <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: '#F3F4F6' }}>Revenue & Order Trajectory (Last 30 Days)</h3>
                <span style={{ fontSize: '0.8rem', color: '#60A5FA', cursor: 'pointer' }}>Download CSV</span>
              </div>
              <div style={{ height: '200px', backgroundColor: '#1F2937', borderRadius: '6px', display: 'flex', alignItems: 'flex-end', padding: '1rem', gap: '0.75rem' }}>
                {[40, 55, 35, 70, 85, 60, 95, 110, 90, 120, 140, 130, 160, 150, 180].map((val, idx) => (
                  <div key={idx} style={{ flex: 1, height: `${val}px`, backgroundColor: '#3B82F6', borderRadius: '4px 4px 0 0', opacity: 0.85 }} />
                ))}
              </div>
            </div>

            {/* Sales by Category Widget */}
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
                    <span>Supplements & Churna</span>
                    <span style={{ fontWeight: 'bold', color: '#10B981' }}>34% ($504k)</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#1F2937', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '34%', height: '100%', backgroundColor: '#10B981' }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    <span>Personal Care & Tailam</span>
                    <span style={{ fontWeight: 'bold', color: '#F59E0B' }}>24% ($356k)</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#1F2937', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '24%', height: '100%', backgroundColor: '#F59E0B' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid: Recent Orders & AI Insights */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
            {/* Recent Orders */}
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

            {/* AI Insights & Alerts */}
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
        </div>
      </main>
    </div>
  );
}
