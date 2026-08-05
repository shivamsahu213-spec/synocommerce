/**
 * SynoCommerce Returns Management & RMA Refund Queue UI
 * @module apps/admin/src/app/returns/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminReturnsPage() {
  const returnsList = [
    { id: 'RMA-401', orderId: '#ORD-98210', customer: 'Vaidya Ramesh Sharma', reason: 'Unopened - Ordered wrong jar size', amount: '$45.00', status: 'RMA_APPROVED' },
    { id: 'RMA-402', orderId: '#ORD-98184', customer: 'Priya Verma', reason: 'Damaged outer seal during transit', amount: '$22.50', status: 'REFUNDED' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Returns Management & RMA Refund Portal"
      actions={
        <>
          <Button variant="secondary">📊 Return Analytics</Button>
          <Button variant="secondary">💳 Process Bulk Refunds</Button>
          <Button variant="primary">+ Issue RMA Label</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Return Requests" value="12 Open" variant="warning" />
        <StatCard title="RMA Rate" value="0.84%" change="-0.2%" variant="success" />
        <StatCard title="Refunds Today" value="$67.50" variant="info" />
        <StatCard title="Restocked Inventory" value="94.2%" variant="success" />
        <StatCard title="Avg Resolution Time" value="1.2 Days" variant="success" />
        <StatCard title="Return SLA" value="100% On Time" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>RMA Stages</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>⏳ Pending Review (4)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>✅ Approved (6)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>💳 Refunded (2)</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>RMA ID & Order</th>
                <th style={{ padding: '0.75rem' }}>Customer</th>
                <th style={{ padding: '0.75rem' }}>Return Reason</th>
                <th style={{ padding: '0.75rem' }}>Refund Amount</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {returnsList.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>
                    <div>{r.id}</div>
                    <div style={{ fontSize: '0.75rem', color: '#60A5FA' }}>{r.orderId}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{r.customer}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{r.reason}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#34D399' }}>{r.amount}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {r.status === 'REFUNDED' ? <Badge variant="success">Refunded</Badge> : <Badge variant="info">Approved</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>RMA Telemetry</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Primary Return Reason</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#60A5FA', marginTop: '0.25rem' }}>Size / Variant Exchange (62%)</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
