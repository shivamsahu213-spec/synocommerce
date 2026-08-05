/**
 * SynoCommerce Customer Product Reviews & Vaidya Endorsements Hub UI
 * Yotpo, Bazaarvoice & Judge.me Quality Moderation Studio
 * @module apps/admin/src/app/reviews/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminReviewsPage() {
  const reviewsList = [
    { id: 'REV-901', product: 'Kalyan Triphala Juice 1L', reviewer: 'Vaidya Ramesh Sharma', rating: '5.0 ★★★★★', comment: 'Authentic formulation. Excellent digestion results for my patients.', status: 'VERIFIED_BUYER' },
    { id: 'REV-902', product: 'Organic Ashwagandha 60s', reviewer: 'Priya Verma (Bhilai)', rating: '5.0 ★★★★★', comment: 'Noticeable reduction in stress after 2 weeks. Highly recommended!', status: 'VERIFIED_BUYER' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Customer Reviews & Vaidya Endorsements Moderation"
      actions={
        <>
          <Button variant="secondary">⭐ Rating Breakdown</Button>
          <Button variant="secondary">🤖 AI Sentiment Filter</Button>
          <Button variant="primary">✓ Approve Selected</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Reviews" value="4,820 Reviews" variant="info" />
        <StatCard title="Average Rating" value="4.9 / 5.0" variant="success" />
        <StatCard title="Verified Buyers" value="98.4%" variant="success" />
        <StatCard title="Vaidya Endorsements" value="142 Reviews" variant="success" />
        <StatCard title="AI Sentiment" value="96% Positive" variant="success" />
        <StatCard title="UGC Photos & Videos" value="1,240 Assets" variant="info" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Review Moderation</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>⭐ Approved Reviews (4,800)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>⏳ Pending Review (20)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🩺 Vaidya Endorsements (142)</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Product & Reviewer</th>
                <th style={{ padding: '0.75rem' }}>Rating</th>
                <th style={{ padding: '0.75rem' }}>Customer Feedback Comment</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {reviewsList.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>
                    <div>{r.product}</div>
                    <div style={{ fontSize: '0.75rem', color: '#60A5FA' }}>{r.reviewer}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#F59E0B', fontWeight: 'bold' }}>{r.rating}</td>
                  <td style={{ padding: '0.75rem', color: '#D1D5DB' }}>{r.comment}</td>
                  <td style={{ padding: '0.75rem' }}><Badge variant="success">Verified</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Top Endorsed Product</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Most Endorsed SKU</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>Triphala Juice 1L (84 Vaidya Reviews)</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
