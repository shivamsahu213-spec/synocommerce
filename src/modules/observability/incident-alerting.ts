/**
 * SRE Alerting Rules & Incident Management Engine
 * @module modules/observability/incident-alerting
 */

import { IncidentRecord, IncidentSeverity } from './types';

export class IncidentAlertingEngine {
  private readonly _incidents = new Map<string, IncidentRecord>();

  public evaluateSloRule(latencyMs: number, errorRatePercentage: number): { isViolated: boolean; recommendedSeverity?: IncidentSeverity } {
    if (errorRatePercentage > 5.0 || latencyMs > 2000) {
      return { isViolated: true, recommendedSeverity: 'SEV1_CRITICAL' };
    }
    if (errorRatePercentage > 1.0 || latencyMs > 500) {
      return { isViolated: true, recommendedSeverity: 'SEV2_MAJOR' };
    }
    return { isViolated: false };
  }

  public declareIncident(title: string, severity: IncidentSeverity, commander = 'sre_oncall'): IncidentRecord {
    const incidentId = `inc_${Date.now()}`;
    const record: IncidentRecord = {
      incidentId,
      title,
      severity,
      status: 'INVESTIGATING',
      commander,
      startedAt: new Date(),
    };

    this._incidents.set(incidentId, record);
    return record;
  }

  public resolveIncident(incidentId: string): IncidentRecord {
    const incident = this._incidents.get(incidentId);
    if (!incident) {
      throw new Error(`Incident '${incidentId}' not found`);
    }

    incident.status = 'RESOLVED';
    incident.resolvedAt = new Date();
    return incident;
  }
}
