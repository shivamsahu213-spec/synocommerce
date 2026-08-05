/**
 * Docs: Getting Started Page
 * @module apps/docs/app/docs/getting-started/page
 */

import React from 'react';

export default function GettingStartedPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#60A5FA' }}>Getting Started with SynoCommerce</h1>
      <p style={{ color: '#9CA3AF', fontSize: '1.1rem', marginBottom: '2rem' }}>
        Learn how to install, configure, and launch your enterprise ecommerce application using SynoCommerce.
      </p>

      <h2>1. Prerequisites</h2>
      <ul>
        <li>Node.js v20.0.0 or higher</li>
        <li>Docker & Docker Compose (optional for local DB/Redis)</li>
      </ul>

      <h2>2. Automated Installation</h2>
      <pre style={{ backgroundColor: '#1F2937', padding: '1rem', borderRadius: '6px', overflowX: 'auto', color: '#10B981' }}>
        npx syno create-store my-ayurvedic-store --preset AYURVEDA
      </pre>

      <h2>3. Development Server</h2>
      <pre style={{ backgroundColor: '#1F2937', padding: '1rem', borderRadius: '6px', overflowX: 'auto', color: '#10B981' }}>
        cd my-ayurvedic-store
        npm run dev
      </pre>
    </div>
  );
}
