/**
 * Enterprise Workflow & Automation Platform Test Suite
 * @module modules/workflows/tests/workflows.test
 */

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ApprovalQueueManager,
  RulesEngineEvaluator,
  WorkflowEngineProcessor,
} from '../index';

test('Enterprise Workflow & Automation Platform', async (t) => {
  const engine = new WorkflowEngineProcessor();
  const rules = new RulesEngineEvaluator();
  const approvals = new ApprovalQueueManager();

  await t.test('Registers active workflow and triggers execution on INVENTORY_LOW event', async () => {
    engine.registerWorkflow({
      workflowId: 'wf_inventory_alert',
      name: 'Inventory Low Auto Reorder',
      trigger: 'INVENTORY_LOW',
      status: 'ACTIVE',
      nodes: [
        { id: 'n1', type: 'TRIGGER', nodeName: 'Inventory Low Trigger', config: {} },
        { id: 'n2', type: 'ACTION', nodeName: 'Send Slack Notification', config: { actionType: 'SEND_SLACK' } },
      ],
    });

    const execResults = await engine.triggerWorkflow('INVENTORY_LOW', { sku: 'KAL-HAIR-001', stockRemaining: 5 });
    assert.equal(execResults.length, 1);
    assert.equal(execResults[0]?.state, 'SUCCESS');
  });

  await t.test('Evaluates business rules & fraud risk thresholds', () => {
    const isEquals = rules.evaluateCondition({ field: 'status', operator: 'EQUALS', value: 'PAID' }, { status: 'PAID' });
    assert.equal(isEquals, true);

    const fraudRes = rules.evaluateFraudRisk(150000, 0.90);
    assert.equal(fraudRes.isFraudulent, true);
    assert.equal(fraudRes.action, 'HOLD_FOR_MANUAL_REVIEW');
  });

  await t.test('Creates multi-level approval request and processes approval decision', () => {
    const req = approvals.createApprovalRequest('exec_wf_refund_101', 'REFUND', 2500, 'finance_admin');
    assert.equal(req.status, 'PENDING');
    assert.equal(req.requestedAmountInr, 2500);

    const processed = approvals.processApproval(req.approvalId, 'APPROVED');
    assert.equal(processed.status, 'APPROVED');
  });
});
