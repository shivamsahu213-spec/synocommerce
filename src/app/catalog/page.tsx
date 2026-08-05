/**
 * Admin Catalog Page
 * @module apps/admin/src/app/catalog/page
 */

import React from 'react';
import { AppLayout, Button, StatCard } from '../../components/design-system';

export default function CatalogPage() {
  return (
    <AppLayout activeTab="products" title="Catalog Taxonomy & Hierarchy">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Categories" value="28 Categories" variant="info" />
        <StatCard title="Catalog SKUs" value="1,420 Items" variant="success" />
        <StatCard title="Attributes" value="142 Fields" variant="info" />
        <StatCard title="Taxonomy Sync" value="100% Synced" variant="success" />
      </div>
    </AppLayout>
  );
}
