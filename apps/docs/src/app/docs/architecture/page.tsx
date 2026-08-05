/**
 * Docs: Architecture Page
 * @module apps/docs/app/docs/architecture/page
 */

import React from 'react';

export default function ArchitectureDocsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#60A5FA' }}>Clean Architecture & Hexagonal Isolation</h1>
      <p style={{ color: '#9CA3AF', fontSize: '1.1rem', marginBottom: '2rem' }}>
        SynoCommerce strictly enforces Domain-Driven Design (DDD) and Hexagonal Architecture to isolate core business rules from external framework dependencies.
      </p>

      <h2>Architectural Layer Flow</h2>
      <pre style={{ backgroundColor: '#1F2937', padding: '1.5rem', borderRadius: '6px', overflowX: 'auto', color: '#93C5FD' }}>
Domain Core (`src/domain/`) 
   └── Application Services (`src/app/`)
          └── Infrastructure Adapters (`src/infrastructure/`)
                 └── Delivery Controllers (`src/delivery/`)
                      └── Storefront & Admin (`apps/storefront/`, `apps/admin/`)
      </pre>
    </div>
  );
}
