/**
 * Docs: Security & Observability Page
 * @module apps/docs/app/docs/security-observability/page
 */

import React from 'react';

export default function SecurityObservabilityDocsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#60A5FA' }}>Security & Observability Platform</h1>
      <p style={{ color: '#9CA3AF', fontSize: '1.1rem', marginBottom: '2rem' }}>
        Learn about SynoCommerce's AES-256-GCM envelope encryption, OpenTelemetry tracing, and SRE incident response.
      </p>

      <h2>Security Features</h2>
      <ul>
        <li><strong>AES-256-GCM Vault:</strong> Field-level envelope encryption using native `node:crypto`.</li>
        <li><strong>GDPR Privacy Engine:</strong> Article 17 Right To Be Forgotten anonymization.</li>
        <li><strong>SHA-256 Hash Chain Logs:</strong> Immutable, tamper-evident security audit logging.</li>
      </ul>

      <h2>Observability Features</h2>
      <ul>
        <li><strong>OpenTelemetry Tracing:</strong> Distributed trace context and parent-child span linking.</li>
        <li><strong>Prometheus Exporter:</strong> Real-time HTTP counter and latency metrics.</li>
      </ul>
    </div>
  );
}
