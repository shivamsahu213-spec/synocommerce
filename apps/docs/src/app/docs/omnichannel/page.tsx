/**
 * Docs: Omnichannel & POS Page
 * @module apps/docs/app/docs/omnichannel/page
 */

import React from 'react';

export default function OmnichannelDocsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#60A5FA' }}>Omnichannel Retail & POS Platform</h1>
      <p style={{ color: '#9CA3AF', fontSize: '1.1rem', marginBottom: '2rem' }}>
        The SynoCommerce Omnichannel Engine (`src/modules/omnichannel/`) powers retail POS registers, offline sync, and BOPIS fulfillment.
      </p>

      <h2>Capabilities</h2>
      <ul>
        <li><strong>POS Register Sessions:</strong> Cash drawer tracking and offline transaction queues.</li>
        <li><strong>Inter-Store Stock Transfer:</strong> Real-time inventory allocation across stores and warehouses.</li>
        <li><strong>BOPIS Fulfillment:</strong> Buy Online Pickup In Store with 6-digit verification codes.</li>
      </ul>
    </div>
  );
}
