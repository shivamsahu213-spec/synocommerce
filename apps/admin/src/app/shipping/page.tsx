/**
 * SynoCommerce Carrier Dashboard & Shipping Logistics UI
 * @module apps/admin/src/app/shipping/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminShippingPage() {
  const shipments = [
    { id: 'SHP-901', carrier: 'FedEx Express', tracking: 'FX-982401824', destination: 'Bhilai, CG', status: 'IN_TRANSIT', eta: 'Today @ 4:00 PM' },
    { id: 'SHP-902', carrier: 'BlueDart Logistics', tracking: 'BD-714019284', destination: 'Raipur, CG', status: 'DELIVERED', eta: 'Delivered' },
    { id: 'SHP-903', carrier: 'DHL Express Global', tracking: 'DHL-48102941', destination: 'New York, US', status: 'IN_TRANSIT', eta: 'Aug 08, 2026' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Carrier Logistics & Shipping Label Dispatch"
      actions={
        <>
          <Button variant="secondary">📦 Pickup Request</Button>
          <Button variant="secondary">🏷️ Print Bulk Labels</Button>
          <Button variant="primary">+ Create Shipment</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Shipments Today" value="482 Packages" variant="info" />
        <StatCard title="In Transit" value="142 Packages" variant="info" />
        <StatCard title="Delivered Today" value="340 Packages" variant="success" />
        <StatCard title="Exceptions / Delays" value="0 Exception" variant="success" />
        <StatCard title="Avg Transit Time" value="1.8 Days" variant="success" />
        <StatCard title="Carrier SLA Rate" value="99.4%" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Logistics Partners</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>🚚 FedEx Express</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>📦 BlueDart Express</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>✈️ DHL Express Global</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Shipment ID</th>
                <th style={{ padding: '0.75rem' }}>Carrier & Tracking</th>
                <th style={{ padding: '0.75rem' }}>Destination</th>
                <th style={{ padding: '0.75rem' }}>ETA</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>{s.id}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ color: '#60A5FA', fontWeight: 'bold' }}>{s.carrier}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF', fontFamily: 'monospace' }}>{s.tracking}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{s.destination}</td>
                  <td style={{ padding: '0.75rem', color: '#34D399' }}>{s.eta}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {s.status === 'DELIVERED' ? <Badge variant="success">Delivered</Badge> : <Badge variant="info">In Transit</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Manifest Status</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Evening Pickup Manifest</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>Scheduled @ 5:30 PM</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
