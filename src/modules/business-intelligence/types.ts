/**
 * Enterprise Business Intelligence Module Types
 * @module src/modules/business-intelligence/types
 */

export type ChartType =
  | 'LINE'
  | 'BAR'
  | 'AREA'
  | 'PIE'
  | 'DONUT'
  | 'TREEMAP'
  | 'HEATMAP'
  | 'SCATTER'
  | 'BUBBLE'
  | 'FUNNEL'
  | 'GAUGE'
  | 'WATERFALL'
  | 'RADAR'
  | 'CANDLESTICK';

export type DashboardRoleType =
  | 'EXECUTIVE'
  | 'FINANCE'
  | 'SALES'
  | 'MARKETING'
  | 'INVENTORY'
  | 'WAREHOUSE'
  | 'OPERATIONS'
  | 'SUPPORT'
  | 'MERCHANT'
  | 'DEVELOPER';

export interface KpiMetric {
  key: string;
  name: string;
  value: number;
  unit: 'USD' | 'PERCENT' | 'RATIO' | 'COUNT';
  growthPercentage: number;
  target?: number | undefined;
}

export interface BiWidget {
  widgetId: string;
  title: string;
  chartType: ChartType;
  dataSource: string;
  metrics: string[];
  layout: { x: number; y: number; w: number; h: number };
}

export interface BiDashboard {
  dashboardId: string;
  title: string;
  role: DashboardRoleType;
  widgets: BiWidget[];
  isTemplate: boolean;
}

export interface DemandForecastPoint {
  date: string;
  actualUsd?: number | undefined;
  forecastedUsd: number;
  lowerConfidenceUsd: number;
  upperConfidenceUsd: number;
}

export interface AnomalyAlert {
  metricName: string;
  detectedAt: Date;
  expectedValue: number;
  actualValue: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}
