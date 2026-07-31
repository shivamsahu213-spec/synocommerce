/**
 * Multi-Level Approval Queue Manager
 * @module modules/workflows/approval-engine
 */

import { ApprovalRecord } from './types';

export class ApprovalQueueManager {
  private readonly _approvals = new Map<string, ApprovalRecord>();

  public createApprovalRequest(
    executionId: string,
    requestType: 'REFUND' | 'PURCHASE' | 'DISCOUNT',
    amountInr: number,
    role = 'store_admin'
  ): ApprovalRecord {
    const approvalId = `appr_${Date.now()}`;
    const record: ApprovalRecord = {
      approvalId,
      workflowExecutionId: executionId,
      requestType,
      requestedAmountInr: amountInr,
      assignedRole: role,
      status: 'PENDING',
    };

    this._approvals.set(approvalId, record);
    return record;
  }

  public processApproval(approvalId: string, decision: 'APPROVED' | 'REJECTED'): ApprovalRecord {
    const record = this._approvals.get(approvalId);
    if (!record) {
      throw new Error(`Approval Request '${approvalId}' not found`);
    }

    record.status = decision;
    return record;
  }
}
