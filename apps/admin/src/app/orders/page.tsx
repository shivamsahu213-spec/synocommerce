/**
 * SynoCommerce Enterprise Orders Management UI
 * Shopify & Apple Quality Production Omnichannel Order Management Portal
 * @module apps/admin/src/app/orders/page
 */

import React from 'react';

export default function AdminOrdersPage() {
  const orders = [
    {
      id: 'ORD-9841',
      customer: 'Vaidya Rajesh Sharma',
      email: 'rajesh.sharma@ayurveda.in',
      itemsCount: '4 Items',
      total: '$420.00',
      paymentStatus: 'PAID',
      fulfillmentStatus: 'FULFILLED',
      shippingStatus: 'SHIPPED',
      date: '2 mins ago',
      channel: 'Kalyan Bhilai Store',
      staff: 'Ankit Mishra',
      fraudRisk: 'LOW_RISK',
    },
    {
      id: 'ORD-9840',
      customer: 'Priya Patel',
      email: 'priya.p@gmail.com',
      itemsCount: '2 Items',
      total: '$185.50',
      paymentStatus: 'PAID',
      fulfillmentStatus: 'PARTIALLY_FULFILLED',
      shippingStatus: 'PACKED',
      date: '14 mins ago',
      channel: 'Online Storefront',
      staff: 'Rohan Sharma',
      fraudRisk: 'LOW_RISK',
    },
    {
      id: 'ORD-9839',
      customer: 'Anita Roy',
      email: 'anita.roy@hotmail.com',
      itemsCount: '8 Items',
      total: '$890.00',
      paymentStatus: 'PAID',
      fulfillmentStatus: 'FULFILLED',
      shippingStatus: 'DELIVERED',
      date: '42 mins ago',
      channel: 'Raipur Hub POS',
      staff: 'Suresh Kumar',
      fraudRisk: 'LOW_RISK',
    },
    {
      id: 'ORD-9838',
      customer: 'Aarav Gupta',
      email: 'aarav.g@tech.io',
      itemsCount: '1 Item',
      total: '$124.00',
      paymentStatus: 'PENDING',
      fulfillmentStatus: 'UNFULFILLED',
      shippingStatus: 'CONFIRMED',
      date: '1 hour ago',
      channel: 'Mobile App (iOS)',
      staff: 'Unassigned',
      fraudRisk: 'MEDIUM_RISK',
    },
    {
      id: 'ORD-9837',
      customer: 'Vikram Singh',
      email: 'vikram.singh@defense.gov',
      itemsCount: '12 Items',
      total: '$2,450.00',
      paymentStatus: 'REFUNDED',
      fulfillmentStatus: 'UNFULFILLED',
      shippingStatus: 'CANCELLED',
      date: '3 hours ago',
      channel: 'B2B Portal',
      staff: 'Meera Sen',
      fraudRisk: 'HIGH_RISK',
    },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: '260px', backgroundColor: '#111827', borderRight: '1px solid #1F2937', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#FFF' }}>
            S
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#F3F4F6' }}>SynoCommerce</div>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Orders Management</div>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <a href="/dashboard" style={{ padding: '0.75rem 1rem', borderRadius: '6px', color: '#9CA3AF', textDecoration: 'none' }}>
            📊 Executive Dashboard
          </a>
          <a href="/products" style={{ padding: '0.75rem 1rem', borderRadius: '6px', color: '#9CA3AF', textDecoration: 'none' }}>
            📦 Products & Catalog
          </a>
          <a href="/orders" style={{ padding: '0.75rem 1rem', borderRadius: '6px', backgroundColor: '#1F2937', color: '#60A5FA', fontWeight: '600', textDecoration: 'none' }}>
            🛍️ Orders & Shipments
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
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Sticky Top Header Toolbar */}
        <header style={{ height: '64px', borderBottom: '1px solid #1F2937', backgroundColor: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', position: 'sticky', top: 0, zIndex: 10 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#F3F4F6' }}>Omnichannel Orders Management</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button style={{ backgroundColor: '#1F2937', color: '#D1D5DB', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              📥 Import Orders
            </button>
            <button style={{ backgroundColor: '#1F2937', color: '#D1D5DB', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              📤 Export CSV
            </button>
            <button style={{ backgroundColor: '#2563EB', color: '#FFF', border: 'none', borderRadius: '6px', padding: '0.5rem 1.25rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>
              + Create Order
            </button>
          </div>
        </header>

        {/* Body Container */}
        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          {/* KPI Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>Today's Orders</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F9FAFB', marginTop: '0.25rem' }}>482</div>
            </div>
            <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>Pending Fulfillment</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F59E0B', marginTop: '0.25rem' }}>14</div>
            </div>
            <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>Completed Orders</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>462</div>
            </div>
            <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>Cancelled Orders</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#EF4444', marginTop: '0.25rem' }}>6</div>
            </div>
            <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>Revenue Today</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6', marginTop: '0.25rem' }}>$48,920</div>
            </div>
            <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>Average Order Value</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8B5CF6', marginTop: '0.25rem' }}>$162.40</div>
            </div>
          </div>

          {/* Filter Bar */}
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search order #, customer, email..."
              style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#F9FAFB', fontSize: '0.85rem', minWidth: '280px', outline: 'none' }}
            />
            <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
              <option>Payment Status: All</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Refunded</option>
            </select>
            <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
              <option>Fulfillment: All</option>
              <option>Fulfilled</option>
              <option>Partially Fulfilled</option>
              <option>Unfulfilled</option>
            </select>
            <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
              <option>Channel: All</option>
              <option>Online Storefront</option>
              <option>Kalyan Bhilai Store</option>
              <option>Raipur Hub POS</option>
            </select>
          </div>

          {/* Bulk Actions Bar */}
          <div style={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '6px', padding: '0.65rem 1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <div style={{ color: '#94A3B8' }}>3 orders selected</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{ backgroundColor: '#334155', color: '#F1F5F9', border: 'none', borderRadius: '4px', padding: '0.35rem 0.75rem', cursor: 'pointer' }}>Print Invoices</button>
              <button style={{ backgroundColor: '#334155', color: '#F1F5F9', border: 'none', borderRadius: '4px', padding: '0.35rem 0.75rem', cursor: 'pointer' }}>Generate Shipping Labels</button>
              <button style={{ backgroundColor: '#2563EB', color: '#FFF', border: 'none', borderRadius: '4px', padding: '0.35rem 0.75rem', cursor: 'pointer' }}>Bulk Fulfill</button>
            </div>
          </div>

          {/* Orders Table & Sidebar Widgets */}
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '1.5rem' }}>
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
                        {o.paymentStatus === 'PAID' && <span style={{ backgroundColor: '#065F46', color: '#A7F3D0', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>Paid</span>}
                        {o.paymentStatus === 'PENDING' && <span style={{ backgroundColor: '#92400E', color: '#FDE68A', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>Pending</span>}
                        {o.paymentStatus === 'REFUNDED' && <span style={{ backgroundColor: '#991B1B', color: '#FCA5A5', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>Refunded</span>}
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
                          <span>Fulfill</span>
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
                <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>🛡️ Fraud Analysis Alerts</h4>
                <div style={{ padding: '0.5rem', backgroundColor: '#7F1D1D', color: '#FEE2E2', borderRadius: '4px', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                  ⚠️ ORD-9837 flagged: High Risk (IP Geolocation mismatch)
                </div>
                <div style={{ padding: '0.5rem', backgroundColor: '#78350F', color: '#FEF3C7', borderRadius: '4px', fontSize: '0.75rem' }}>
                  ⚡ ORD-9838 flagged: Medium Risk (Multiple card attempts)
                </div>
              </div>

              <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>💎 High Value Orders Today</h4>
                <div style={{ fontSize: '0.85rem', color: '#D1D5DB' }}>
                  <strong>ORD-9837</strong> - $2,450.00 (B2B Bulk Purchase)
                </div>
                <div style={{ fontSize: '0.85rem', color: '#D1D5DB', marginTop: '0.35rem' }}>
                  <strong>ORD-9839</strong> - $890.00 (Ayurvedic Clinic Kit)
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
