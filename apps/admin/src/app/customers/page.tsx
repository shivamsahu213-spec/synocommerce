/**
 * SynoCommerce Enterprise Customers Management UI
 * Shopify Polaris Quality Customer Intelligence & LTV Studio
 * @module apps/admin/src/app/customers/page
 */

import React from 'react';

import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminCustomersPage() {
  const customers = [
    {
      id: 'CUST-001',
      name: 'Vaidya Rajesh Sharma',
      email: 'rajesh.sharma@ayurveda.in',
      phone: '+91 98271 45001',
      country: 'India (Bhilai)',
      ordersCount: 42,
      lifetimeSpend: '$4,850.00',
      loyaltyTier: 'PLATINUM',
      status: 'VIP',
      lastOrder: '2 mins ago',
      avatar: '👨‍⚕️',
    },
    {
      id: 'CUST-002',
      name: 'Priya Patel',
      email: 'priya.p@gmail.com',
      phone: '+91 94252 11024',
      country: 'India (Raipur)',
      ordersCount: 14,
      lifetimeSpend: '$1,240.00',
      loyaltyTier: 'GOLD',
      status: 'ACTIVE',
      lastOrder: '14 mins ago',
      avatar: '👩',
    },
    {
      id: 'CUST-003',
      name: 'Anita Roy',
      email: 'anita.roy@hotmail.com',
      phone: '+91 98261 88402',
      country: 'India (Durg)',
      ordersCount: 28,
      lifetimeSpend: '$3,180.00',
      loyaltyTier: 'GOLD',
      status: 'ACTIVE',
      lastOrder: '42 mins ago',
      avatar: '👩‍💼',
    },
    {
      id: 'CUST-004',
      name: 'Aarav Gupta',
      email: 'aarav.g@tech.io',
      phone: '+91 91110 33405',
      country: 'India (Bengaluru)',
      ordersCount: 2,
      lifetimeSpend: '$180.00',
      loyaltyTier: 'BRONZE',
      status: 'ACTIVE',
      lastOrder: '1 hour ago',
      avatar: '👨‍💻',
    },
    {
      id: 'CUST-005',
      name: 'Vikram Singh',
      email: 'vikram.singh@defense.gov',
      phone: '+91 99812 77011',
      country: 'India (Delhi)',
      ordersCount: 0,
      lifetimeSpend: '$0.00',
      loyaltyTier: 'SILVER',
      status: 'BLOCKED',
      lastOrder: 'Never',
      avatar: '👤',
    },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Customers & Lifetime Value Studio"
      actions={
        <>
          <Button variant="secondary">📥 Import Customers</Button>
          <Button variant="secondary">📤 Export CSV</Button>
          <Button variant="primary">+ Add Customer</Button>
        </>
      }
    >
      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Customers" value="18,420" />
        <StatCard title="New Today" value="124" variant="success" />
        <StatCard title="Returning Buyers" value="12,840" variant="success" />
        <StatCard title="VIP Accounts" value="1,250" variant="success" />
        <StatCard title="Avg Lifetime Value" value="$840.50" variant="success" />
        <StatCard title="Avg Order Value" value="$162.40" />
      </div>

      {/* Filter Bar */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search name, email, phone or account ID..."
          style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#F9FAFB', fontSize: '0.85rem', minWidth: '280px', outline: 'none' }}
        />
        <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
          <option>Customer Group: All</option>
          <option>Wholesale B2B</option>
          <option>Retail VIP</option>
        </select>
        <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
          <option>Status: All</option>
          <option>VIP</option>
          <option>Active</option>
          <option>Blocked</option>
        </select>
        <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
          <option>Loyalty Tier: All</option>
          <option>Platinum</option>
          <option>Gold</option>
          <option>Silver</option>
          <option>Bronze</option>
        </select>
      </div>

      {/* Table & Sidebar Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '1.5rem' }}>
        {/* Customer Data Table */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}><input type="checkbox" /></th>
                <th style={{ padding: '0.75rem' }}>Customer</th>
                <th style={{ padding: '0.75rem' }}>Contact</th>
                <th style={{ padding: '0.75rem' }}>Location</th>
                <th style={{ padding: '0.75rem' }}>Orders</th>
                <th style={{ padding: '0.75rem' }}>Lifetime Spend</th>
                <th style={{ padding: '0.75rem' }}>Loyalty Tier</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem' }}><input type="checkbox" /></td>
                  <td style={{ padding: '0.75rem', fontWeight: '600', color: '#F3F4F6' }}>
                    <span style={{ marginRight: '0.5rem' }}>{c.avatar}</span> {c.name}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div>{c.email}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{c.phone}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{c.country}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{c.ordersCount}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#34D399' }}>{c.lifetimeSpend}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {c.loyaltyTier === 'PLATINUM' && <Badge variant="info">💎 Platinum</Badge>}
                    {c.loyaltyTier === 'GOLD' && <Badge variant="warning">🥇 Gold</Badge>}
                    {c.loyaltyTier === 'SILVER' && <Badge variant="neutral">🥈 Silver</Badge>}
                    {c.loyaltyTier === 'BRONZE' && <Badge variant="neutral">🥉 Bronze</Badge>}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    {c.status === 'VIP' && <Badge variant="success">VIP</Badge>}
                    {c.status === 'ACTIVE' && <Badge variant="success">Active</Badge>}
                    {c.status === 'BLOCKED' && <Badge variant="danger">Blocked</Badge>}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', color: '#60A5FA', fontSize: '0.8rem', cursor: 'pointer' }}>
                      <span>View</span>
                      <span>Edit</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sidebar Widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>🤖 AI Customer Insights</h4>
            <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB', borderLeft: '3px solid #10B981' }}>
              💡 Vaidya accounts in Bhilai have 3.4x higher LTV than average retail customers. Consider dedicated Vaidya portal discounts.
            </div>
          </div>

          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>🏆 Top Spenders</h4>
            <div style={{ fontSize: '0.85rem', color: '#D1D5DB' }}>
              <strong>Vaidya Rajesh Sharma</strong> - $4,850.00 (42 orders)
            </div>
            <div style={{ fontSize: '0.85rem', color: '#D1D5DB', marginTop: '0.35rem' }}>
              <strong>Anita Roy</strong> - $3,180.00 (28 orders)
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
