/**
 * SynoCommerce Order Picking, Packing & SLA Fulfillment Control Studio UI
 * @module apps/admin/src/app/fulfillment/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminFulfillmentPage() {
  const fulfillmentQueue = [
    { id: 'FUL-101', order: '#ORD-98240', customer: 'Ankit Mishra (Bhilai)', items: '3 Items (Triphala, Ashwagandha)', picker: 'Ramesh (Zone A)', status: 'PICKING' },
    { id: 'FUL-102', order: '#ORD-98241', customer: 'Suresh Kumar (Raipur)', items: '2 Items (Chyawanprash)', packer: 'Sita (Zone B)', status: 'PACKING' },
    { id: 'FUL-103', order: '#ORD-98242', customer: 'Priya Verma (Delhi)', items: '1 Item (Kumkumadi Serum)', carrier: 'FedEx Express', status: 'SHIPPED' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Omnichannel Order Fulfillment & Warehouse Picking Engine"
      actions={
        <>
          <Button variant="secondary">📋 Generate Picklists</Button>
          <Button variant="secondary">📦 Packing Station</Button>
          <Button variant="primary">🚀 Dispatch Batch</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Fulfillment Queue" value="42 Orders" variant="warning" />
        <StatCard title="Currently Picking" value="12 Orders" variant="info" />
        <StatCard title="Currently Packing" value="8 Orders" variant="info" />
        <StatCard title="Dispatched Today" value="380 Orders" variant="success" />
        <StatCard title="SLA Compliance" value="99.8% On Time" variant="success" />
        <StatCard title="Avg Pick-to-Pack" value="14 Minutes" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Fulfillment Stages</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>📋 Picking Queue (12)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>📦 Packing Station (8)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🚚 Dispatched (380)</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Queue ID & Order</th>
                <th style={{ padding: '0.75rem' }}>Customer & Destination</th>
                <th style={{ padding: '0.75rem' }}>Line Items</th>
                <th style={{ padding: '0.75rem' }}>Station Staff</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {fulfillmentQueue.map((f) => (
                <tr key={f.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>
                    <div>{f.id}</div>
                    <div style={{ fontSize: '0.75rem', color: '#60A5FA' }}>{f.order}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{f.customer}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{f.items}</td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA' }}>{f.picker || f.packer || f.carrier}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {f.status === 'SHIPPED' && <Badge variant="success">Shipped</Badge>}
                    {f.status === 'PICKING' && <Badge variant="warning">Picking</Badge>}
                    {f.status === 'PACKING' && <Badge variant="info">Packing</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Same-Day SLA</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Cut-off Countdown</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>2 Hours 40 Mins Remaining</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
