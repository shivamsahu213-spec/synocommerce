/**
 * Enterprise Workflow & Automation Type Definitions
 * @module modules/workflows/types
 */

export type WorkflowTriggerType =
  | 'ORDER_CREATED'
  | 'ORDER_PAID'
  | 'INVENTORY_LOW'
  | 'CART_ABANDONED'
  | 'CUSTOMER_REGISTERED'
  | 'WEBHOOK_RECEIVED';

export type WorkflowActionType =
  | 'SEND_EMAIL'
  | 'SEND_SLACK'
  | 'UPDATE_INVENTORY'
  | 'SYNC_ERP'
  | 'ISSUE_REFUND'
  | 'REQUIRE_APPROVAL';

export type WorkflowStatus = 'DRAFT' | 'ACTIVE' | 'SUSPENDED';

export type WorkflowExecutionState = 'RUNNING' | 'SUCCESS' | 'WAITING_APPROVAL' | 'FAILED';

export interface WorkflowNode {
  id: string;
  type: 'TRIGGER' | 'CONDITION' | 'ACTION';
  nodeName: string;
  config: Record<string, any>;
}

export interface WorkflowDefinition {
  workflowId: string;
  name: string;
  trigger: WorkflowTriggerType;
  nodes: WorkflowNode[];
  status: WorkflowStatus;
  version: number;
}

export interface WorkflowExecutionResult {
  executionId: string;
  workflowId: string;
  state: WorkflowExecutionState;
  executedNodesCount: number;
  variables: Record<string, any>;
  startedAt: Date;
  completedAt?: Date | undefined;
}

export interface ApprovalRecord {
  approvalId: string;
  workflowExecutionId: string;
  requestType: 'REFUND' | 'PURCHASE' | 'DISCOUNT';
  requestedAmountInr: number;
  assignedRole: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
