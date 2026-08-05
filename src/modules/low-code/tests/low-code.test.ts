/**
 * Enterprise Low-Code Application Designer Test Suite
 * @module src/modules/low-code/tests/low-code.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { SynoLowCodeEngine } from '../low-code-engine';

test('Enterprise Low-Code Application Designer Engine', async (t) => {
  const engine = new SynoLowCodeEngine();

  await t.test('Creates visual low-code application schema with default root container', () => {
    const app = engine.createApplication('Kalyan Warehouse Portal', 'WAREHOUSE_APP');
    assert.equal(app.name, 'Kalyan Warehouse Portal');
    assert.equal(app.type, 'WAREHOUSE_APP');
    assert.equal(app.published, false);
    assert.ok(app.rootContainer.children?.length! >= 2);
  });

  await t.test('Evaluates formula expressions (SUM, IF, CONCAT)', () => {
    const sumResult = engine.evaluateFormula('SUM(10, 20.5, 30)');
    assert.equal(sumResult.value, 60.5);

    const ifResult = engine.evaluateFormula("IF(status == 'ACTIVE', true, false)");
    assert.equal(ifResult.value, 'PASSED');

    const concatResult = engine.evaluateFormula("CONCAT('Syno', 'Commerce')");
    assert.equal(concatResult.value, 'SynoCommerce');
  });

  await t.test('Adds component node to visual layout canvas', () => {
    const app = engine.createApplication('Support Ticket Tool', 'SUPPORT_APP');
    const newComponent = {
      id: 'btn_submit',
      type: 'BUTTON' as const,
      label: 'Submit Ticket Button',
      props: { variant: 'primary', label: 'Submit Ticket' },
    };

    const updatedApp = engine.addComponentToApp(app.appId, 'root_grid', newComponent);
    assert.ok(updatedApp.rootContainer.children?.some((c) => c.id === 'btn_submit'));
  });

  await t.test('Publishes application and exports JSON schema', () => {
    const app = engine.createApplication('CRM App', 'CRM_APP');
    const published = engine.publishApplication(app.appId);
    assert.equal(published.published, true);

    const json = engine.exportAppJson(app.appId);
    assert.ok(json.includes('CRM App'));
    assert.ok(json.includes('CRM_APP'));
  });
});
