/**
 * Docs: Enterprise B2B Commerce Page
 * @module apps/docs/app/docs/b2b/page
 */

import React from 'react';

export default function B2bDocsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#60A5FA' }}>Enterprise B2B Commerce</h1>
      <p style={{ color: '#9CA3AF', fontSize: '1.1rem', marginBottom: '2rem' }}>
        The SynoCommerce B2B Module (`src/modules/b2b/`) enables corporate account management, credit limit validation, and RFQ negotiations.
      </p>

      <h2>Core Capabilities</h2>
      <ul>
        <li><strong>Net 15/30/60 Credit Lines:</strong> Credit availability checks prior to PO checkout.</li>
        <li><strong>Contract Pricing:</strong> Customer-specific negotiated price overrides.</li>
        <li><strong>Request For Quote (RFQ):</strong> Supplier counter-offer negotiation workflow.</li>
      </ul>
    </div>
  );
}
