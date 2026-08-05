/**
 * SynoCommerce Omnichannel Desktop POS & Retail Terminal UI
 * @module src/app/pos/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminPosPage() {
  const posCart = [
    { name: 'Kalyan Triphala Juice 1L', qty: 2, price: '$15.00', total: '$30.00' },
    { name: 'Organic Ashwagandha 60s', qty: 1, price: '$18.00', total: '$18.00' },
    { name: 'Chyawanprash 500g Glass Jar', qty: 1, price: '$22.50', total: '$22.50' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Omnichannel Desktop POS & Retail Checkout Terminal"
      actions={
        <>
          <Button variant="secondary">📷 Barcode Scanner Active</Button>
          <Button variant="secondary">💵 Cash Drawer ($1,250.00)</Button>
          <Button variant="primary">🧾 Print Receipt</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="POS Register" value="Bhilai Register #1" variant="info" />
        <StatCard title="Today's POS Sales" value="$42,850.00" change="+14.2%" variant="success" />
        <StatCard title="Transactions" value="184 Orders" variant="info" />
        <StatCard title="Cash Balance" value="$1,250.00" variant="success" />
        <StatCard title="Card Payments" value="$34,600.00" variant="success" />
        <StatCard title="UPI / QR Payments" value="$7,000.00" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#F3F4F6' }}>Quick Catalog Lookup (Bhilai Stock)</h3>
            <input
              type="text"
              placeholder="Scan SKU barcode or search product..."
              style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.4rem 0.75rem', color: '#FFF', fontSize: '0.85rem', width: '280px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#1F2937', borderRadius: '6px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '1.5rem' }}>🍵</div>
              <div style={{ fontWeight: 'bold', color: '#FFF', marginTop: '0.25rem' }}>Triphala Juice 1L</div>
              <div style={{ color: '#10B981', fontWeight: 'bold', marginTop: '0.25rem' }}>$15.00</div>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#1F2937', borderRadius: '6px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '1.5rem' }}>🌿</div>
              <div style={{ fontWeight: 'bold', color: '#FFF', marginTop: '0.25rem' }}>Ashwagandha 60s</div>
              <div style={{ color: '#10B981', fontWeight: 'bold', marginTop: '0.25rem' }}>$18.00</div>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#1F2937', borderRadius: '6px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '1.5rem' }}>🍯</div>
              <div style={{ fontWeight: 'bold', color: '#FFF', marginTop: '0.25rem' }}>Chyawanprash 500g</div>
              <div style={{ color: '#10B981', fontWeight: 'bold', marginTop: '0.25rem' }}>$22.50</div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 'bold', color: '#F3F4F6' }}>Current Customer Cart</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              {posCart.map((item, idx) => (
                <div key={idx} style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#F3F4F6' }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Qty: {item.qty} x {item.price}</div>
                  </div>
                  <div style={{ fontWeight: 'bold', color: '#34D399' }}>{item.total}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid #1F2937', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', color: '#FFF', marginBottom: '1rem' }}>
              <span>Total Payable:</span>
              <span style={{ color: '#10B981' }}>$70.50</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <Button variant="secondary">💵 Cash ($70.50)</Button>
              <Button variant="primary">💳 Split / Card Payment</Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
