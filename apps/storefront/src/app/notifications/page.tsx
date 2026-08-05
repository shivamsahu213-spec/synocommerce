/**
 * Storefront Customer Notification Preferences Page
 * @module apps/storefront/app/notifications/page
 */

import React from 'react';

export default function StorefrontNotificationPreferencesPage() {
  return (
    <div style={{ backgroundColor: '#0A0E1A', color: '#F3F4F6', fontFamily: 'sans-serif', minHeight: '100vh', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: '#111827', padding: '2.5rem', borderRadius: '10px', border: '1px solid #1F2937' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#60A5FA' }}>Communication Preferences</h1>
        <p style={{ color: '#9CA3AF', marginBottom: '2rem' }}>Manage how SynoCommerce communicates with you for orders, delivery updates, and offers.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1F2937', padding: '1rem', borderRadius: '8px' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>Email Notifications</div>
              <div style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>Order receipts, shipping updates, and invoices.</div>
            </div>
            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
          </label>

          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1F2937', padding: '1rem', borderRadius: '8px' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>SMS Alerts & OTPs</div>
              <div style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>Instant login OTPs and delivery status SMS.</div>
            </div>
            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
          </label>

          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1F2937', padding: '1rem', borderRadius: '8px' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>WhatsApp Updates</div>
              <div style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>Order updates, live tracking links, and customer support.</div>
            </div>
            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
          </label>

          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1F2937', padding: '1rem', borderRadius: '8px' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>Mobile & Web Push Notifications</div>
              <div style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>Flash sales, stock alerts, and instant order popups.</div>
            </div>
            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
          </label>
        </div>
      </div>
    </div>
  );
}
