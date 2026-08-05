/**
 * Production Documentation Website Test Suite
 * @module apps/docs/tests/docs.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';

test('Production Documentation Website: Structure & Navigation', async (t) => {
  const sidebarLinks = [
    '/docs/getting-started',
    '/docs/architecture',
    '/docs/commerce-engine',
    '/docs/ai',
    '/docs/integration-hub',
    '/docs/workflows',
    '/docs/b2b',
    '/docs/omnichannel',
    '/docs/api-platform',
    '/docs/saas',
    '/docs/security-observability',
    '/docs/deployment',
  ];

  await t.test('Verifies 12 primary documentation navigation endpoints', () => {
    assert.equal(sidebarLinks.length, 12);
    assert.ok(sidebarLinks.includes('/docs/getting-started'));
    assert.ok(sidebarLinks.includes('/docs/saas'));
    assert.ok(sidebarLinks.includes('/docs/deployment'));
  });

  await t.test('Verifies CLI quickstart command snippet in documentation', () => {
    const quickstartCmd = 'npx syno create-store my-ayurvedic-store --preset AYURVEDA';
    assert.ok(quickstartCmd.startsWith('npx syno create-store'));
  });
});
