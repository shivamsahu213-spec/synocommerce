/**
 * Docs: API & Developer SDK Page
 * @module apps/docs/app/docs/api-platform/page
 */

import React from 'react';

export default function ApiPlatformDocsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#60A5FA' }}>API Gateway & Developer SDK</h1>
      <p style={{ color: '#9CA3AF', fontSize: '1.1rem', marginBottom: '2rem' }}>
        The SynoCommerce API Platform (`src/modules/api-platform/`) provides API Gateway rate limiting, OpenAPI 3.1 specs, and HMAC webhooks.
      </p>

      <h2>Capabilities</h2>
      <ul>
        <li><strong>Token-Bucket Rate Limiter:</strong> Scoped API keys with request rate throttling.</li>
        <li><strong>OpenAPI 3.1 & Postman:</strong> Auto-generated API schemas and Postman Collections.</li>
        <li><strong>HMAC Webhooks:</strong> SHA-256 signature verification and event replay.</li>
      </ul>
    </div>
  );
}
