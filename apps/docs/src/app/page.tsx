/**
 * Production Documentation Website Landing Homepage
 * @module apps/docs/app/page
 */

import React from 'react';

export default function DocsHomepage() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#0B0F19', color: '#F9FAFB', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid #1F2937', paddingBottom: '1rem' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6' }}>
          SynoCommerce Docs <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', backgroundColor: '#1E3A8A', borderRadius: '4px', color: '#93C5FD' }}>v1.0.0 GA</span>
        </div>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="/docs/getting-started" style={{ color: '#E5E7EB', textDecoration: 'none' }}>Getting Started</a>
          <a href="/docs/architecture" style={{ color: '#E5E7EB', textDecoration: 'none' }}>Architecture</a>
          <a href="/docs/api-platform" style={{ color: '#E5E7EB', textDecoration: 'none' }}>API & SDK</a>
          <a href="/docs/saas" style={{ color: '#E5E7EB', textDecoration: 'none' }}>SaaS Control Plane</a>
        </nav>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <section style={{ textAlign: 'center', margin: '4rem 0' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '1rem' }}>
            Enterprise Commerce Framework Documentation
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#9CA3AF', maxWidth: '700px', margin: '0 auto 2rem auto' }}>
            Build, scale, and customize headless commerce, B2B procurement, POS retail, and multi-tenant SaaS platforms with Next.js 15 and Clean Architecture.
          </p>
          <div style={{ backgroundColor: '#111827', padding: '1rem 2rem', borderRadius: '8px', display: 'inline-block', border: '1px solid #374151' }}>
            <code style={{ color: '#10B981', fontSize: '1.1rem' }}>npx syno create-store my-commerce-app</code>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', margin: '4rem 0' }}>
          <a href="/docs/getting-started" style={{ backgroundColor: '#1F2937', padding: '1.5rem', borderRadius: '8px', textDecoration: 'none', color: 'inherit', border: '1px solid #374151' }}>
            <h3 style={{ color: '#60A5FA', marginTop: 0 }}>🚀 Getting Started</h3>
            <p style={{ color: '#9CA3AF', fontSize: '0.95rem' }}>Install SynoCommerce in under 5 minutes with automated CLI presets.</p>
          </a>
          <a href="/docs/architecture" style={{ backgroundColor: '#1F2937', padding: '1.5rem', borderRadius: '8px', textDecoration: 'none', color: 'inherit', border: '1px solid #374151' }}>
            <h3 style={{ color: '#60A5FA', marginTop: 0 }}>🏗️ Clean Architecture</h3>
            <p style={{ color: '#9CA3AF', fontSize: '0.95rem' }}>Hexagonal DDD isolation, value objects, and zero-dependency core.</p>
          </a>
          <a href="/docs/commerce-engine" style={{ backgroundColor: '#1F2937', padding: '1.5rem', borderRadius: '8px', textDecoration: 'none', color: 'inherit', border: '1px solid #374151' }}>
            <h3 style={{ color: '#60A5FA', marginTop: 0 }}>⚡ Commerce Engine</h3>
            <p style={{ color: '#9CA3AF', fontSize: '0.95rem' }}>Sub-10ms checkout runtime, volume pricing, and inventory reservations.</p>
          </a>
          <a href="/docs/ai" style={{ backgroundColor: '#1F2937', padding: '1.5rem', borderRadius: '8px', textDecoration: 'none', color: 'inherit', border: '1px solid #374151' }}>
            <h3 style={{ color: '#60A5FA', marginTop: 0 }}>🤖 Enterprise AI</h3>
            <p style={{ color: '#9CA3AF', fontSize: '0.95rem' }}>Multi-provider LLM router, 128-dim vector search, and Merchant Copilot.</p>
          </a>
          <a href="/docs/b2b" style={{ backgroundColor: '#1F2937', padding: '1.5rem', borderRadius: '8px', textDecoration: 'none', color: 'inherit', border: '1px solid #374151' }}>
            <h3 style={{ color: '#60A5FA', marginTop: 0 }}>💼 B2B Commerce</h3>
            <p style={{ color: '#9CA3AF', fontSize: '0.95rem' }}>Corporate accounts, Net 30 credit lines, contract catalogs, and RFQs.</p>
          </a>
          <a href="/docs/omnichannel" style={{ backgroundColor: '#1F2937', padding: '1.5rem', borderRadius: '8px', textDecoration: 'none', color: 'inherit', border: '1px solid #374151' }}>
            <h3 style={{ color: '#60A5FA', marginTop: 0 }}>🏪 Omnichannel POS</h3>
            <p style={{ color: '#9CA3AF', fontSize: '0.95rem' }}>POS register sessions, offline mode queue sync, and BOPIS fulfillment.</p>
          </a>
        </section>
      </main>
    </div>
  );
}
