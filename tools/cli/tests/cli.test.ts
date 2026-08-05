/**
 * Syno Developer Platform & CLI Integration Test Suite
 * @module tools/cli/tests/cli.test
 */

import assert from 'node:assert/strict';
import test from 'node:test';

import { CodeGeneratorEngine, DoctorEngine, PackagerEngine,runCli } from '../index';

test('Developer Platform: Syno CLI Commands', async (t) => {
  await t.test('Executes syno doctor command and returns passed diagnostic checks', () => {
    const doctor = new DoctorEngine();
    const checks = doctor.runDiagnostics();
    assert.equal(checks.length, 4);
    assert.equal(checks[0]?.passed, true);
  });

  await t.test('Executes syno generate plugin command', () => {
    const generator = new CodeGeneratorEngine();
    const res = generator.generate('plugin', 'custom-analytics');
    assert.equal(res.type, 'plugin');
    assert.ok(res.codeContent.includes('CustomAnalyticsPlugin'));
  });

  await t.test('Executes syno generate payment-provider command', () => {
    const generator = new CodeGeneratorEngine();
    const res = generator.generate('payment-provider', 'adyen');
    assert.equal(res.type, 'payment-provider');
    assert.ok(res.codeContent.includes('AdyenPaymentAdapter'));
  });

  await t.test('Packages extensions via PackagerEngine', () => {
    const packager = new PackagerEngine();
    const pkg = packager.packageExtension('stripe-payments', 'Stripe Payments', '2.0.0', 'plugin');
    assert.equal(pkg.fileName, 'stripe-payments-2.0.0.synopkg');
    assert.equal(pkg.manifest.packageType, 'plugin');
  });

  await t.test('Runs full CLI handler command routing', () => {
    const outputDoctor = runCli(['doctor']);
    assert.ok(outputDoctor.includes('SynoCommerce Doctor System Report'));

    const outputGenerate = runCli(['generate', 'plugin', 'loyalty']);
    assert.ok(outputGenerate.includes("Generated plugin 'loyalty'"));

    const outputDeploy = runCli(['deploy']);
    assert.ok(outputDeploy.includes('Deployed SynoCommerce platform instance'));
  });
});
