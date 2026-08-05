/**
 * Production Documentation Layout (Sidebar, Search, Version Selector)
 * @module apps/docs/app/docs/layout
 */

import React from 'react';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const sidebarLinks = [
    { title: 'Getting Started', href: '/docs/getting-started' },
    { title: 'Architecture Map', href: '/docs/architecture' },
    { title: 'Commerce Engine', href: '/docs/commerce-engine' },
    { title: 'Enterprise AI Platform', href: '/docs/ai' },
    { title: 'Integration Hub', href: '/docs/integration-hub' },
    { title: 'Workflow Automation', href: '/docs/workflows' },
    { title: 'Enterprise B2B', href: '/docs/b2b' },
    { title: 'Omnichannel & POS', href: '/docs/omnichannel' },
    { title: 'API & Developer SDK', href: '/docs/api-platform' },
    { title: 'SaaS Control Plane', href: '/docs/saas' },
    { title: 'Security & SRE', href: '/docs/security-observability' },
    { title: 'Deployment & DevOps', href: '/docs/deployment' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '280px', borderRight: '1px solid #1F2937', padding: '1.5rem', backgroundColor: '#111827' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1.5rem', color: '#3B82F6' }}>
          SynoCommerce Docs
        </div>
        <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: '#9CA3AF' }}>
          Version: <span style={{ color: '#10B981', fontWeight: 'bold' }}>v1.0.0 GA</span>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {sidebarLinks.map((link) => (
            <a key={link.href} href={link.href} style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '0.95rem' }}>
              {link.title}
            </a>
          ))}
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '3rem', maxWidth: '900px' }}>
        {children}
      </main>
    </div>
  );
}
