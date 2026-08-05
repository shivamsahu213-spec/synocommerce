/**
 * Storefront Instant Search & Faceted Navigation Page
 * @module apps/storefront/app/search/page
 */

import React from 'react';

export default function StorefrontSearchPage() {
  return (
    <div style={{ backgroundColor: '#0A0E1A', color: '#F3F4F6', fontFamily: 'sans-serif', minHeight: '100vh', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Search Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Search catalog by product name, SKU, brand, or ayurvedic goal..."
            defaultValue="Triphala"
            style={{ width: '100%', padding: '1rem 1.25rem', backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#F3F4F6', fontSize: '1.1rem' }}
          />
        </div>

        {/* Layout with Facets and Search Results */}
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
          {/* Facets Sidebar */}
          <aside style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937', height: 'fit-content' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#60A5FA' }}>Filter Facets</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Category</div>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}><input type="checkbox" defaultChecked /> Ayurveda (14)</label>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}><input type="checkbox" /> Personal Care (8)</label>
            </div>
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Brand</div>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}><input type="checkbox" defaultChecked /> Kalyan Ayurvedic (12)</label>
            </div>
          </aside>

          {/* Results Grid */}
          <main style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Showing 2 results for <strong>"Triphala"</strong></span>
              <span style={{ color: '#10B981', fontSize: '0.85rem' }}>Query time: 2.1ms (Meilisearch)</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ backgroundColor: '#1F2937', padding: '1rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: '#93C5FD' }}>Kalyan Ayurvedic Triphala Juice (1L)</h4>
                  <div style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>SKU: KAL-TRIP-1L • Brand: Kalyan Ayurvedic</div>
                </div>
                <strong style={{ fontSize: '1.1rem', color: '#34D399' }}>₹599.00</strong>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
