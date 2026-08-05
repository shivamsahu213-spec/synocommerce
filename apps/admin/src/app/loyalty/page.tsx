/**
 * SynoCommerce Loyalty Rewards & VIP Tiers Studio UI
 * Smile.io, Yotpo & LoyaltyLion Quality Rewards Portal
 * @module apps/admin/src/app/loyalty/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminLoyaltyPage() {
  const vipTiers = [
    { tier: 'Vaidya Gold VIP', members: '1,420 Members', pointsRule: '2x Points per $1', perks: 'Free Express Delivery + Priority Consult', status: 'ACTIVE' },
    { tier: 'Ayurvedic Silver', members: '3,840 Members', pointsRule: '1.5x Points per $1', perks: '5% Off Recurring Autoship', status: 'ACTIVE' },
    { tier: 'Bronze Member', members: '12,800 Members', pointsRule: '1x Points per $1', perks: 'Welcome 100 Points', status: 'ACTIVE' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Loyalty Rewards & VIP Membership Tiers"
      actions={
        <>
          <Button variant="secondary">🎁 Redeem Rules</Button>
          <Button variant="secondary">📊 Points Analytics</Button>
          <Button variant="primary">+ Create VIP Tier</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Active Loyalty Members" value="18,060 Members" variant="success" />
        <StatCard title="Points Issued" value="4.2 M Points" variant="info" />
        <StatCard title="Points Redeemed" value="1.8 M Points" variant="info" />
        <StatCard title="Redemption Rate" value="42.8%" change="+3.2%" variant="success" />
        <StatCard title="VIP Repeat LTV Lift" value="2.8x Higher" variant="success" />
        <StatCard title="Program ROI" value="5.4x ROI" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Rewards Rules</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>👑 VIP Tiers (3)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🎁 Points Earning Rules</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🎟️ Redemption Rewards</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>VIP Tier Name</th>
                <th style={{ padding: '0.75rem' }}>Members Count</th>
                <th style={{ padding: '0.75rem' }}>Points Earning Multiplier</th>
                <th style={{ padding: '0.75rem' }}>Exclusive Perks</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {vipTiers.map((t, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>{t.tier}</td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA', fontWeight: 'bold' }}>{t.members}</td>
                  <td style={{ padding: '0.75rem', color: '#34D399' }}>{t.pointsRule}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{t.perks}</td>
                  <td style={{ padding: '0.75rem' }}><Badge variant="success">Active</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Top Tier Perk</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Gold VIP Privilege</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>Free Same-Day Delivery (Bhilai)</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
