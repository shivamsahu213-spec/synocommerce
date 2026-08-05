/**
 * SynoCommerce Enterprise Billing & Subscription UI
 * Stripe Billing, Chargebee & Shopify Billing Quality Financial Portal
 * @module apps/admin/src/app/billing/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminBillingPage() {
  const invoicesList = [
    {
      id: 'INV-2026-08',
      date: 'Aug 01, 2026',
      amount: '$1,250.00',
      status: 'PAID',
      paymentMethod: 'Visa •••• 4242',
    },
    {
      id: 'INV-2026-07',
      date: 'Jul 01, 2026',
      amount: '$1,250.00',
      status: 'PAID',
      paymentMethod: 'Visa •••• 4242',
    },
    {
      id: 'INV-2026-06',
      date: 'Jun 01, 2026',
      amount: '$1,180.00',
      status: 'PAID',
      paymentMethod: 'Visa •••• 4242',
    },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Billing & Subscription Management"
      actions={
        <>
          <Button variant="secondary">📊 View Usage</Button>
          <Button variant="secondary">💳 Payment Method</Button>
          <Button variant="secondary">📥 Latest Invoice</Button>
          <Button variant="primary">🚀 Upgrade Plan</Button>
        </>
      }
    >
      {/* Top KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Current Plan" value="Enterprise Plus" variant="success" />
        <StatCard title="Monthly Base" value="$1,250.00" variant="info" />
        <StatCard title="Projected Invoice" value="$1,480.00" subtext="Inc. Metered AI" />
        <StatCard title="API Metered" value="14.2M / 20M" variant="info" />
        <StatCard title="Storage Metered" value="185GB / 1TB" variant="info" />
        <StatCard title="Next Billing Date" value="Sep 01, 2026" variant="info" />
      </div>

      {/* 3-Column Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Left Sidebar */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Financial Control</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>
              💳 Active Subscription
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🧾 Invoices & Receipts (36)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              💳 Payment Methods (2)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              📊 Usage Metering
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🎁 Credits ($500.00 Active)
            </div>
          </div>
        </div>

        {/* Center Panel: Invoices & Usage */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Invoices Table */}
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid #1F2937', fontWeight: 'bold', color: '#F3F4F6' }}>Recent Invoices</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                  <th style={{ padding: '0.75rem' }}>Invoice ID</th>
                  <th style={{ padding: '0.75rem' }}>Billing Date</th>
                  <th style={{ padding: '0.75rem' }}>Amount</th>
                  <th style={{ padding: '0.75rem' }}>Method</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem' }}>Download</th>
                </tr>
              </thead>
              <tbody>
                {invoicesList.map((inv) => (
                  <tr key={inv.id} style={{ borderBottom: '1px solid #1F2937' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>{inv.id}</td>
                    <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{inv.date}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#34D399' }}>{inv.amount}</td>
                    <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{inv.paymentMethod}</td>
                    <td style={{ padding: '0.75rem' }}><Badge variant="success">Paid</Badge></td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ color: '#60A5FA', cursor: 'pointer' }}>PDF</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar: Payment Method */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Primary Card</h3>
          <div style={{ padding: '1rem', background: 'linear-gradient(135deg, #1E40AF, #1E1B4B)', borderRadius: '8px', color: '#FFF' }}>
            <div style={{ fontSize: '0.8rem', color: '#93C5FD' }}>Corporate Visa</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0.5rem 0' }}>•••• •••• •••• 4242</div>
            <div style={{ fontSize: '0.75rem', color: '#BFDBFE' }}>Expires 12/28</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
