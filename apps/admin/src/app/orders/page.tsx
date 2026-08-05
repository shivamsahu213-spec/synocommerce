/**
 * SynoCommerce Orders Management UI (Refactored to Design System)
 * @module apps/admin/src/app/orders/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminOrdersPage() {
  const orders = [
    {
      id: 'ORD-9841',
      customer: 'Vaidya Rajesh Sharma',
      email: 'rajesh.sharma@ayurveda.in',
      total: '$420.00',
      paymentStatus: 'PAID',
      fulfillmentStatus: 'FULFILLED',
      channel: 'Kalyan Bhilai Store',
    },
    {
      id: 'ORD-9840',
      customer: 'Priya Patel',
      email: 'priya.p@gmail.com',
      total: '$185.50',
      paymentStatus: 'PAID',
      fulfillmentStatus: 'PARTIALLY_FULFILLED',
      channel: 'Online Storefront',
    },
    {
      id: 'ORD-9839',
      customer: 'Anita Roy',
      email: 'anita.roy@hotmail.com',
      total: '$890.00',
      paymentStatus: 'PAID',
      fulfillmentStatus: 'FULFILLED',
      channel: 'Raipur Hub POS',
    },
    {
      id: 'ORD-9838',
      customer: 'Aarav Gupta',
      email: 'aarav.g@tech.io',
      total: '$124.00',
      paymentStatus: 'PENDING',
      fulfillmentStatus: 'UNFULFILLED',
      channel: 'Mobile App (iOS)',
    },
  ];

  return (
    <AppLayout
      activeTab="orders"
      title="Omnichannel Orders Management"
      actions={
        <>
          <Button variant="secondary">📥 Import Orders</Button>
          <Button variant="secondary">📤 Export CSV</Button>
          <Button variant="primary">+ Create Order</Button>
        </>
      }
    >
      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Today's Orders" value="482" />
        <StatCard title="Pending Fulfillment" value="14" variant="warning" />
        <StatCard title="Completed Orders" value="462" variant="success" />
        <StatCard title="Revenue Today" value="$48,920" variant="success" />
      </div>

      {/* Filter Bar */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search order #, customer, email..."
          style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#F9FAFB', fontSize: '0.85rem', minWidth: '280px', outline: 'none' }}
        />
        <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
          <option>Payment Status: All</option>
          <option>Paid</option>
          <option>Pending</option>
        </select>
      </div>

      {/* Orders Table */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}><input type="checkbox" /></th>
              <th style={{ padding: '0.75rem' }}>Order #</th>
              <th style={{ padding: '0.75rem' }}>Customer</th>
              <th style={{ padding: '0.75rem' }}>Total</th>
              <th style={{ padding: '0.75rem' }}>Payment</th>
              <th style={{ padding: '0.75rem' }}>Fulfillment</th>
              <th style={{ padding: '0.75rem' }}>Channel</th>
              <th style={{ padding: '0.75rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem' }}><input type="checkbox" /></td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#60A5FA' }}>{o.id}</td>
                <td style={{ padding: '0.75rem' }}>
                  <div>{o.customer}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{o.email}</div>
                </td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{o.total}</td>
                <td style={{ padding: '0.75rem' }}>
                  {o.paymentStatus === 'PAID' && <Badge variant="success">Paid</Badge>}
                  {o.paymentStatus === 'PENDING' && <Badge variant="warning">Pending</Badge>}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  {o.fulfillmentStatus === 'FULFILLED' && <span style={{ color: '#10B981', fontWeight: 'bold' }}>● Fulfilled</span>}
                  {o.fulfillmentStatus === 'PARTIALLY_FULFILLED' && <span style={{ color: '#F59E0B', fontWeight: 'bold' }}>● Partial</span>}
                  {o.fulfillmentStatus === 'UNFULFILLED' && <span style={{ color: '#EF4444', fontWeight: 'bold' }}>● Unfulfilled</span>}
                </td>
                <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{o.channel}</td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', color: '#60A5FA', fontSize: '0.8rem', cursor: 'pointer' }}>
                    <span>View</span>
                    <span>Invoice</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
