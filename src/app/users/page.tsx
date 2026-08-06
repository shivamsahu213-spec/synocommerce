/**
 * Admin Users Page
 * @module apps/admin/src/app/users/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function UsersPage() {
  return (
    <AppLayout activeTab="dashboard" title="Admin Staff & User Access Control">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Staff Users" value="14 Admins" variant="info" />
        <StatCard title="Active Sessions" value="4 Online" variant="success" />
        <StatCard title="MFA Protection" value="100% Enforced" variant="success" />
        <StatCard title="SSO / SAML 2.0" value="Active" variant="success" />
      </div>
    </AppLayout>
  );
}
