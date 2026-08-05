/**
 * SynoCommerce Marketing Website (synocommerce.com)
 * @module apps/website/app/page
 */

import React from 'react';

export default function MarketingHomepage() {
  return (
    <div style={{ backgroundColor: '#0A0E1A', color: '#F3F4F6', fontFamily: 'system-ui, sans-serif', minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* Navigation Bar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', borderBottom: '1px solid #1F2937' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6' }}>
          SynoCommerce <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', backgroundColor: '#1E3A8A', color: '#93C5FD', borderRadius: '4px' }}>v1.0.0 GA</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem' }}>
          <a href="#features" style={{ color: '#D1D5DB', textDecoration: 'none' }}>Features</a>
          <a href="#architecture" style={{ color: '#D1D5DB', textDecoration: 'none' }}>Architecture</a>
          <a href="#pricing" style={{ color: '#D1D5DB', textDecoration: 'none' }}>Pricing</a>
          <a href="#case-studies" style={{ color: '#D1D5DB', textDecoration: 'none' }}>Case Studies</a>
          <a href="/docs" style={{ color: '#D1D5DB', textDecoration: 'none' }}>Docs</a>
        </div>
        <div>
          <a href="https://cloud.synocommerce.com" style={{ padding: '0.6rem 1.2rem', backgroundColor: '#2563EB', color: '#FFFFFF', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}>
            Get Started Free
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '6rem 2rem 4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', lineHeight: 1.15, marginBottom: '1.5rem', background: 'linear-gradient(to right, #60A5FA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          The Next-Generation Enterprise Commerce Engine & SaaS Platform
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#9CA3AF', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Build, customize, and scale headless commerce, B2B procurement, POS retail, and multi-tenant cloud platforms with Next.js 15, Clean Architecture, and AI Store Provisioning.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <a href="https://cloud.synocommerce.com" style={{ padding: '0.8rem 2rem', backgroundColor: '#2563EB', color: '#FFFFFF', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.05rem' }}>
            Start 14-Day Free Trial
          </a>
          <a href="https://demo.synocommerce.com" style={{ padding: '0.8rem 2rem', backgroundColor: '#1F2937', color: '#E5E7EB', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.05rem', border: '1px solid #374151' }}>
            Explore Live Demo
          </a>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '2.25rem', textAlign: 'center', marginBottom: '3rem', color: '#F9FAFB' }}>
          Built for Enterprise Performance & Scale
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <div style={{ backgroundColor: '#111827', padding: '2rem', borderRadius: '10px', border: '1px solid #1F2937' }}>
            <h3 style={{ color: '#60A5FA', marginTop: 0 }}>⚡ Commerce Engine</h3>
            <p style={{ color: '#9CA3AF' }}>Sub-10ms checkout execution, volume tier pricing, stock reservations, and RMA refunds.</p>
          </div>
          <div style={{ backgroundColor: '#111827', padding: '2rem', borderRadius: '10px', border: '1px solid #1F2937' }}>
            <h3 style={{ color: '#60A5FA', marginTop: 0 }}>🤖 Enterprise AI</h3>
            <p style={{ color: '#9CA3AF' }}>Multi-provider LLM router (OpenAI, Anthropic, Gemini), 128-dim vector search, and Merchant Copilot.</p>
          </div>
          <div style={{ backgroundColor: '#111827', padding: '2rem', borderRadius: '10px', border: '1px solid #1F2937' }}>
            <h3 style={{ color: '#60A5FA', marginTop: 0 }}>💼 B2B Procurement</h3>
            <p style={{ color: '#9CA3AF' }}>Corporate account hierarchies, Net 30 credit lines, contract catalogs, and RFQ negotiations.</p>
          </div>
          <div style={{ backgroundColor: '#111827', padding: '2rem', borderRadius: '10px', border: '1px solid #1F2937' }}>
            <h3 style={{ color: '#60A5FA', marginTop: 0 }}>🏪 Omnichannel POS</h3>
            <p style={{ color: '#9CA3AF' }}>POS register sessions, offline queue sync, inter-store stock transfers, and BOPIS fulfillment.</p>
          </div>
          <div style={{ backgroundColor: '#111827', padding: '2rem', borderRadius: '10px', border: '1px solid #1F2937' }}>
            <h3 style={{ color: '#60A5FA', marginTop: 0 }}>🔄 Integration Hub</h3>
            <p style={{ color: '#9CA3AF' }}>Connectors for SAP S/4HANA, Dynamics, Salesforce, Amazon, Shiprocket with DLQ retry.</p>
          </div>
          <div style={{ backgroundColor: '#111827', padding: '2rem', borderRadius: '10px', border: '1px solid #1F2937' }}>
            <h3 style={{ color: '#60A5FA', marginTop: 0 }}>🔒 Security & Compliance</h3>
            <p style={{ color: '#9CA3AF' }}>AES-256-GCM envelope vault, GDPR privacy anonymization, Zero Trust risk scoring, and SHA-256 hash chains.</p>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section id="case-studies" style={{ backgroundColor: '#111827', padding: '4rem 2rem', borderTop: '1px solid #1F2937', borderBottom: '1px solid #1F2937' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', color: '#F9FAFB', marginBottom: '1rem' }}>Production Customer Spotlight</h2>
          <h3 style={{ color: '#34D399', fontSize: '1.5rem', marginBottom: '1rem' }}>Kalyan Ayurvedic — Bhilai, Chhattisgarh</h3>
          <p style={{ color: '#D1D5DB', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto 1.5rem auto' }}>
            "SynoCommerce allowed Kalyan Ayurvedic to launch our luxury botanical ecommerce storefront with 100% data privacy, sub-10ms checkout speeds, and seamless Vaidya doctor consultation recommendations."
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1F2937', padding: '3rem 2rem', textAlign: 'center', color: '#6B7280', fontSize: '0.9rem' }}>
        <p>© 2026 SynoStack Technologies. Released under MIT and Enterprise Licenses. All rights reserved.</p>
      </footer>
    </div>
  );
}
