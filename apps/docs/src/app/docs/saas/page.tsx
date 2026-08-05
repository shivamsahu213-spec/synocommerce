/**
 * Docs: SaaS Control Plane Page
 * @module apps/docs/app/docs/saas/page
 */

import React from 'react';

export default function SaasDocsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#60A5FA' }}>Central SaaS Control Plane</h1>
      <p style={{ color: '#9CA3AF', fontSize: '1.1rem', marginBottom: '2rem' }}>
        The SynoCommerce SaaS Platform (`platform/saas/`, `portal.synocommerce.com`) enables automated multi-tenant store provisioning.
      </p>

      <h2>Capabilities</h2>
      <ul>
        <li><strong>Tenant Isolation:</strong> Dedicated DB schemas (tenant_tenantId_storeId) and Redis key prefixes.</li>
        <li><strong>Subscription Overage Metering:</strong> Automated invoice generation with $0.08 per overage order.</li>
        <li><strong>Custom Domain SSL:</strong> CNAME DNS validation and Let's Encrypt certificate issuance.</li>
      </ul>
    </div>
  );
}
