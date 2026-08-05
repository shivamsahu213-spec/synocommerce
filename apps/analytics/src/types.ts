/**
 * Analytics Portal Application Types
 * @module apps/analytics/src/types
 */

export type AnalyticsTab = 'EXECUTIVE' | 'FINANCE' | 'SALES' | 'MARKETING' | 'INVENTORY' | 'REPORT_BUILDER';

export interface AnalyticsFilter {
  startDate: string;
  endDate: string;
  comparePreviousPeriod: boolean;
}
