/**
 * SynoCommerce Cloud Merchant Portal (cloud.synocommerce.com)
 * @module apps/cloud/app/page
 */

import React from 'react';

export default function CloudMerchantPortal() {
  return (
    <div style={{ backgroundColor: '#0F172A', color: '#F8FAFC', fontFamily: 'system-ui, sans-serif', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: '#1E293B', padding: '1.5rem', borderRight: '1px solid #334155' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#38BDF8', marginBottom: '2rem' }}>
          Syno Cloud Control
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
          <a href="#" style={{ color: '#38BDF8', fontWeight: 'bold', textDecoration: 'none' }}>📊 Dashboard</a>
          <a href="#" style={{ color: '#94A3B8', textDecoration: 'none' }}>🏪 Stores (2 Active)</a>
          <a href="#" style={{ color: '#94A3B8', textDecoration: 'none' }}>💳 Billing & Invoices</a>
          <a href="#" style={{ color: '#94A3B8', textDecoration: 'none' }}>🌐 Custom Domains</a>
          <a href="#" style={{ color: '#94A3B8', textDecoration: 'none' }}>🤖 AI & API Usage</a>
          <a href="#" style={{ color: '#94A3B8', textDecoration: 'none' }}>👥 Team & Security</a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2.5rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: 0 }}>Merchant Dashboard</h1>
            <p style={{ color: '#94A3B8', margin: '0.25rem 0 0 0' }}>Welcome back, Acuity Brands Admin (Tenant ID: tenant_acme)</p>
          </div>
          <button style={{ padding: '0.6rem 1.2rem', backgroundColor: '#0284C7', color: '#FFFFFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Create New Store
          </button>
        </header>

        {/* Plan Overview Banner */}
        <section style={{ backgroundColor: '#1E293B', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#38BDF8', fontWeight: 'bold' }}>CURRENT SUBSCRIPTION</span>
            <h3 style={{ margin: '0.25rem 0', fontSize: '1.25rem' }}>Professional Tier ($999 / month)</h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: 0 }}>Renewal Date: August 31, 2026 • 25,000 Monthly Orders Included</p>
          </div>
          <span style={{ padding: '0.4rem 0.8rem', backgroundColor: '#065F46', color: '#34D399', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
            ACTIVE & PAID
          </span>
        </section>

        {/* Active Stores List */}
        <section style={{ backgroundColor: '#1E293B', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Active Provisioned Stores</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#0F172A', borderRadius: '6px', border: '1px solid #334155' }}>
              <div>
                <strong>Kalyan Ayurvedic Store</strong>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Domain: kalyan.synocommerce.com (SSL Active)</div>
              </div>
              <span style={{ padding: '0.25rem 0.6rem', backgroundColor: '#1E3A8A', color: '#93C5FD', borderRadius: '4px', fontSize: '0.8rem' }}>
                ONLINE
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#0F172A', borderRadius: '6px', border: '1px solid #334155' }}>
              <div>
                <strong>Aura Minimal Fashion Store</strong>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Domain: fashion.acme.com (CNAME Verified)</div>
              </div>
              <span style={{ padding: '0.25rem 0.6rem', backgroundColor: '#1E3A8A', color: '#93C5FD', borderRadius: '4px', fontSize: '0.8rem' }}>
                ONLINE
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
