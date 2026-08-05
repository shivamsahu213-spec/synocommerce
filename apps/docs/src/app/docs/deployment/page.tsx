/**
 * Docs: Deployment & DevOps Page
 * @module apps/docs/app/docs/deployment/page
 */

import React from 'react';

export default function DeploymentDocsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#60A5FA' }}>Deployment & CI/CD Pipelines</h1>
      <p style={{ color: '#9CA3AF', fontSize: '1.1rem', marginBottom: '2rem' }}>
        SynoCommerce includes production Docker, Kubernetes, Helm Charts, and GitHub Actions CI/CD workflows.
      </p>

      <h2>Docker Deployment</h2>
      <pre style={{ backgroundColor: '#1F2937', padding: '1rem', borderRadius: '6px', overflowX: 'auto', color: '#10B981' }}>
        docker compose up -d
      </pre>

      <h2>Kubernetes Deployment</h2>
      <pre style={{ backgroundColor: '#1F2937', padding: '1rem', borderRadius: '6px', overflowX: 'auto', color: '#10B981' }}>
        helm upgrade --install synocommerce ./helm/synocommerce
      </pre>
    </div>
  );
}
