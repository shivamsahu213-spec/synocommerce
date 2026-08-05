/**
 * Docs: Commerce Engine Page
 * @module apps/docs/app/docs/commerce-engine/page
 */

import React from 'react';

export default function CommerceEngineDocsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#60A5FA' }}>Commerce Engine Runtime</h1>
      <p style={{ color: '#9CA3AF', fontSize: '1.1rem', marginBottom: '2rem' }}>
        The SynoCommerce Commerce Engine (`src/modules/commerce-engine/`) provides sub-10ms checkout execution, volume pricing, stock reservations, and RMA refunds.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li><strong>Cart & Checkout Workflow:</strong> Atomic checkout pipeline with inventory safety stock validation.</li>
        <li><strong>Volume Tier Pricing:</strong> Automated bulk quantity discounts.</li>
        <li><strong>Multi-Currency Engine:</strong> Dynamic currency conversions (INR, USD, EUR).</li>
      </ul>
    </div>
  );
}
