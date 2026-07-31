/**
 * Business Rules & Condition Evaluator Engine
 * @module modules/workflows/rules-engine
 */

export interface ConditionRule {
  field: string;
  operator: 'EQUALS' | 'GREATER_THAN' | 'LESS_THAN' | 'CONTAINS';
  value: any;
}

export class RulesEngineEvaluator {
  public evaluateCondition(rule: ConditionRule, context: Record<string, any>): boolean {
    const fieldValue = context[rule.field];

    switch (rule.operator) {
      case 'EQUALS':
        return fieldValue === rule.value;
      case 'GREATER_THAN':
        return Number(fieldValue) > Number(rule.value);
      case 'LESS_THAN':
        return Number(fieldValue) < Number(rule.value);
      case 'CONTAINS':
        return String(fieldValue).includes(String(rule.value));
      default:
        return false;
    }
  }

  public evaluateFraudRisk(orderTotal: number, riskScore: number): { isFraudulent: boolean; action: string } {
    if (riskScore > 0.85 || orderTotal > 100000) {
      return { isFraudulent: true, action: 'HOLD_FOR_MANUAL_REVIEW' };
    }
    return { isFraudulent: false, action: 'AUTO_APPROVE' };
  }
}
