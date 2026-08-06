/**
 * Admin Settings Page
 * @module apps/admin/src/app/settings/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function SettingsPage() {
  return (
    <AppLayout activeTab="dashboard" title="Enterprise Store & Global Platform Settings">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Store Name" value="SynoCommerce Core" variant="info" />
        <StatCard title="Default Currency" value="USD ($)" variant="info" />
        <StatCard title="Timezone" value="UTC +05:30 (IST)" variant="info" />
        <StatCard title="SSL & Security" value="100% Encrypted" variant="success" />
      </div>
    </AppLayout>
  );
}
