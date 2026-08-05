/**
 * SynoCommerce Enterprise Discounts & Promotions UI
 * Shopify & Apple Quality Production Pricing Rules & Promotions Studio
 * @module apps/admin/src/app/discounts/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminDiscountsPage() {
  const discountsList = [
    {
      id: 'DISC-001',
      name: 'Kalyan Monsoon Wellness Sale',
      code: 'MONSOON20',
      type: 'PERCENTAGE (20%)',
      status: 'ACTIVE',
      usage: '8,420 / 10,000',
      revenue: '$485,000.00',
      start: 'Aug 01, 2026',
      end: 'Aug 31, 2026',
      method: 'MANUAL',
    },
    {
      id: 'DISC-002',
      name: 'Free Express Shipping on Orders > $100',
      code: 'FREESHIP100',
      type: 'FREE SHIPPING',
      status: 'ACTIVE',
      usage: '4,150 uses',
      revenue: '$620,000.00',
      start: 'Jan 01, 2026',
      end: 'Dec 31, 2026',
      method: 'AUTOMATIC',
    },
    {
      id: 'DISC-003',
      name: 'Vaidya VIP Clinic Special $50 Off',
      code: 'VAIDYA50VIP',
      type: 'FIXED AMOUNT ($50)',
      status: 'SCHEDULED',
      usage: '0 / 500',
      revenue: '$0.00',
      start: 'Sep 01, 2026',
      end: 'Sep 15, 2026',
      method: 'MANUAL',
    },
    {
      id: 'DISC-004',
      name: 'Buy 2 Get 1 Free Kumkumadi Tailam',
      code: 'B2G1KUMKUM',
      type: 'BUY_X_GET_Y',
      status: 'EXPIRED',
      usage: '2,320 uses',
      revenue: '$140,000.00',
      start: 'Jul 01, 2026',
      end: 'Jul 31, 2026',
      method: 'AUTOMATIC',
    },
  ];

  return (
    <AppLayout
      activeTab="discounts"
      title="Discounts & Promotions Studio"
      actions={
        <>
          <Button variant="secondary">⚡ Automatic Rule</Button>
          <Button variant="secondary">📥 Import</Button>
          <Button variant="secondary">📤 Export</Button>
          <Button variant="primary">+ Create Discount</Button>
        </>
      }
    >
      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Promotions" value="42" />
        <StatCard title="Active Live" value="28" variant="success" />
        <StatCard title="Scheduled" value="4" variant="info" />
        <StatCard title="Expired" value="10" variant="warning" />
        <StatCard title="Revenue Driven" value="$1.24 M" variant="success" />
        <StatCard title="Total Redemptions" value="14,890" variant="success" />
      </div>

      {/* Filter Bar */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search promo code, campaign name..."
          style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#F9FAFB', fontSize: '0.85rem', minWidth: '280px', outline: 'none' }}
        />
        <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
          <option>Discount Type: All</option>
          <option>Percentage Off</option>
          <option>Fixed Amount Off</option>
          <option>Buy X Get Y</option>
          <option>Free Shipping</option>
        </select>
        <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
          <option>Status: All</option>
          <option>Active</option>
          <option>Scheduled</option>
          <option>Expired</option>
        </select>
      </div>

      {/* 3-Column Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1.5rem' }}>
        {/* Left Sidebar: Categories */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Promotion Types</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>
              🏷️ Percentage Discounts (14)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              💵 Fixed Amount Off (8)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🎁 Buy X Get Y Free (6)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🚚 Free Shipping Rules (4)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              ⚡ Automatic Cart Rules (10)
            </div>
          </div>
        </div>

        {/* Center: Table & Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                  <th style={{ padding: '0.75rem' }}>Discount</th>
                  <th style={{ padding: '0.75rem' }}>Code</th>
                  <th style={{ padding: '0.75rem' }}>Type</th>
                  <th style={{ padding: '0.75rem' }}>Redemptions</th>
                  <th style={{ padding: '0.75rem' }}>Revenue</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {discountsList.map((d) => (
                  <tr key={d.id} style={{ borderBottom: '1px solid #1F2937' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>
                      <div>{d.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{d.method} PROMOTION</div>
                    </td>
                    <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#60A5FA' }}>{d.code}</td>
                    <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{d.type}</td>
                    <td style={{ padding: '0.75rem' }}>{d.usage}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#34D399' }}>{d.revenue}</td>
                    <td style={{ padding: '0.75rem' }}>
                      {d.status === 'ACTIVE' && <Badge variant="success">Active</Badge>}
                      {d.status === 'SCHEDULED' && <Badge variant="info">Scheduled</Badge>}
                      {d.status === 'EXPIRED' && <Badge variant="warning">Expired</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar: AI & Telemetry */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>🏆 Top Coupon Code</h4>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#60A5FA', fontFamily: 'monospace' }}>MONSOON20</div>
            <div style={{ fontSize: '0.8rem', color: '#D1D5DB', marginTop: '0.25rem' }}>Drove $485,000 in revenue across 8,420 checkouts.</div>
          </div>

          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>🤖 AI Promotion Suggestions</h4>
            <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB', borderLeft: '3px solid #10B981' }}>
              💡 Launch a "Spend $150 Get Free Chyawanprash 250g" rule. Predicted +18% conversion lift for cart values between $110-$140.
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
