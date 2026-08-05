/**
 * Admin Plugins Page
 * @module apps/admin/src/app/plugins/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function PluginsPage() {
  return (
    <AppLayout activeTab="dashboard" title="Plugins & Extension Marketplace Foundation">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Installed Extensions" value="14 Plugins" variant="info" />
        <StatCard title="Marketplace Updates" value="2 Available" variant="warning" />
        <StatCard title="API Webhooks" value="100% Active" variant="success" />
        <StatCard title="Sandbox Isolation" value="Enforced" variant="success" />
      </div>
    </AppLayout>
  );
}
