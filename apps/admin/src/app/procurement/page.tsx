/**
 * SynoCommerce Procurement, Purchase Orders & Vendor Management UI
 * @module apps/admin/src/app/procurement/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminProcurementPage() {
  const purchaseOrders = [
    { id: 'PO-8801', vendor: 'Kalyan Ayurvedic Herb Farms (Bhilai Unit)', items: 'Organic Triphala Extract (5,000L)', amount: '$42,500.00', expected: 'Aug 10, 2026', status: 'IN_TRANSIT' },
    { id: 'PO-8802', vendor: 'Himalayan Organic Botanicals', items: 'Raw Ashwagandha Root Powder (2,000kg)', amount: '$28,000.00', expected: 'Aug 12, 2026', status: 'APPROVED' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Procurement & Purchase Orders (PO) Portal"
      actions={
        <>
          <Button variant="secondary">🏢 Approved Vendors (14)</Button>
          <Button variant="secondary">📥 Receive Goods</Button>
          <Button variant="primary">+ Create Purchase Order</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Open Purchase Orders" value="6 Orders" variant="info" />
        <StatCard title="Total PO Spend" value="$70,500.00" variant="info" />
        <StatCard title="Approved Vendors" value="14 Vendors" variant="success" />
        <StatCard title="Receiving Pending" value="2 Shipments" variant="warning" />
        <StatCard title="Vendor On-Time Rate" value="98.2%" variant="success" />
        <StatCard title="Quality Pass Rate" value="99.6%" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>PO Workflows</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>📄 Purchase Orders (6)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🏢 Verified Vendors (14)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>📥 Goods Receiving Log</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>PO Number</th>
                <th style={{ padding: '0.75rem' }}>Vendor Partner</th>
                <th style={{ padding: '0.75rem' }}>Items Ordered</th>
                <th style={{ padding: '0.75rem' }}>Total Amount</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((po) => (
                <tr key={po.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>{po.id}</td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA' }}>{po.vendor}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{po.items}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#34D399' }}>{po.amount}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {po.status === 'IN_TRANSIT' ? <Badge variant="info">In Transit</Badge> : <Badge variant="success">Approved</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Vendor Rating</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Top Rated Vendor</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>Kalyan Herb Farms (99.8%)</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
