/**
 * SynoCommerce Autoship & Recurring Subscriptions Hub UI
 * Recharge, Skio & Bold Subscriptions Quality Portal
 * @module apps/admin/src/app/subscriptions/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminSubscriptionsPage() {
  const subscriptions = [
    { id: 'SUB-301', customer: 'Ankit Mishra (Bhilai)', item: 'Triphala Juice 1L (Monthly Autoship)', frequency: 'Every 30 Days', price: '$13.50 (-10% Off)', nextShip: 'Aug 15, 2026', status: 'ACTIVE' },
    { id: 'SUB-302', customer: 'Suresh Kumar (Raipur)', item: 'Chyawanprash 500g (Bi-Monthly)', frequency: 'Every 60 Days', price: '$20.25 (-10% Off)', nextShip: 'Sep 01, 2026', status: 'ACTIVE' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Autoship & Recurring Subscriptions Management"
      actions={
        <>
          <Button variant="secondary">📅 Upcoming Shipments</Button>
          <Button variant="secondary">🏷️ Discount Rules</Button>
          <Button variant="primary">+ Create Subscription</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Active Subscriptions" value="1,840 Active" variant="success" />
        <StatCard title="Monthly Recurring Rev (MRR)" value="$48,200.00" change="+12.4%" variant="success" />
        <StatCard title="Annual Run Rate (ARR)" value="$578,400.00" variant="success" />
        <StatCard title="Autoship Churn Rate" value="1.12%" change="-0.3%" variant="success" />
        <StatCard title="Subscribers Retention" value="98.88%" variant="success" />
        <StatCard title="Average Order Frequency" value="Every 32 Days" variant="info" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Subscription Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>🔄 Active Autoship (1,840)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>⏸️ Paused (42)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>❌ Cancelled (18)</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Subscription & Customer</th>
                <th style={{ padding: '0.75rem' }}>Autoship Product</th>
                <th style={{ padding: '0.75rem' }}>Frequency & Price</th>
                <th style={{ padding: '0.75rem' }}>Next Shipment</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>
                    <div>{s.id}</div>
                    <div style={{ fontSize: '0.75rem', color: '#60A5FA' }}>{s.customer}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#D1D5DB' }}>{s.item}</td>
                  <td style={{ padding: '0.75rem', color: '#34D399', fontWeight: 'bold' }}>{s.price} ({s.frequency})</td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA' }}>{s.nextShip}</td>
                  <td style={{ padding: '0.75rem' }}><Badge variant="success">Active</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Autoship Discount</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Default Incentive</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>10% Off + Free Shipping</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
