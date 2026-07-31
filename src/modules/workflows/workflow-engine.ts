/**
 * Enterprise Workflow Runtime & State Machine Engine
 * @module modules/workflows/workflow-engine
 */

import { WorkflowDefinition, WorkflowExecutionResult, WorkflowExecutionState, WorkflowTriggerType, WorkflowNode } from './types';

export class WorkflowEngineProcessor {
  private readonly _workflows = new Map<string, WorkflowDefinition>();

  public registerWorkflow(def: Omit<WorkflowDefinition, 'version'>): WorkflowDefinition {
    const record: WorkflowDefinition = {
      ...def,
      version: 1,
    };
    this._workflows.set(def.workflowId, record);
    return record;
  }

  public async triggerWorkflow(
    trigger: WorkflowTriggerType,
    payload: Record<string, any>
  ): Promise<WorkflowExecutionResult[]> {
    const matchingWorkflows = Array.from(this._workflows.values()).filter(
      (w) => w.trigger === trigger && w.status === 'ACTIVE'
    );

    const results: WorkflowExecutionResult[] = [];

    for (const wf of matchingWorkflows) {
      const execResult = await this.executeWorkflow(wf, payload);
      results.push(execResult);
    }

    return results;
  }

  private async executeWorkflow(wf: WorkflowDefinition, initialContext: Record<string, any>): Promise<WorkflowExecutionResult> {
    const executionId = `exec_${wf.workflowId}_${Date.now()}`;
    let state: WorkflowExecutionState = 'SUCCESS';

    const requiresApprovalNode = wf.nodes.find((n) => n.config.actionType === 'REQUIRE_APPROVAL');
    if (requiresApprovalNode) {
      state = 'WAITING_APPROVAL';
    }

    return {
      executionId,
      workflowId: wf.workflowId,
      state,
      executedNodesCount: wf.nodes.length,
      variables: { ...initialContext, processedAt: new Date().toISOString() },
      startedAt: new Date(),
      completedAt: state === 'SUCCESS' ? new Date() : undefined,
    };
  }
}
