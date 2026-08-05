/**
 * Enterprise Commerce Intelligence & Analytics Platform Types
 * @module src/modules/analytics/types
 */

export type AnalyticsEventType =
  | 'ORDER_CREATED'
  | 'ORDER_CANCELLED'
  | 'ORDER_REFUNDED'
  | 'CUSTOMER_REGISTERED'
  | 'PRODUCT_VIEWED'
  | 'ADD_TO_CART'
  | 'CHECKOUT_STARTED'
  | 'CHECKOUT_COMPLETED'
  | 'LOGIN'
  | 'SEARCH'
  | 'REVIEW_CREATED';

export interface AnalyticsEvent {
  eventId: string;
  eventType: AnalyticsEventType;
  timestamp: Date;
  customerId?: string;
  sessionId?: string;
  payload: Record<string, any>;
  context: {
    country?: string;
    state?: string;
    city?: string;
    device?: string;
    channel?: string;
    campaign?: string;
  };
}

export interface ExecutiveKpis {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  conversionRate: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  customerAcquisitionCost: number;
  returnOnAdSpend: number;
  repeatPurchaseRate: number;
  grossMarginPercentage: number;
  netMarginPercentage: number;
  refundPercentage: number;
  inventoryTurnoverRate: number;
  sellThroughRate: number;
  abandonedCartRate: number;
}

export type RevenueDimension =
  | 'country'
  | 'state'
  | 'city'
  | 'device'
  | 'channel'
  | 'campaign'
  | 'category'
  | 'brand'
  | 'sku';

export interface RevenueBreakdown {
  dimension: RevenueDimension;
  key: string;
  revenue: number;
  ordersCount: number;
}

export type WidgetType =
  | 'CHART'
  | 'TABLE'
  | 'FUNNEL'
  | 'MAP'
  | 'HEATMAP'
  | 'COHORT'
  | 'RETENTION_CURVE'
  | 'FORECAST';

export interface DashboardWidget {
  widgetId: string;
  title: string;
  type: WidgetType;
  data: any;
}

export interface ExecutiveDashboard {
  dashboardType: 'CEO' | 'CMO' | 'CTO' | 'WAREHOUSE' | 'FINANCE';
  generatedAt: Date;
  widgets: DashboardWidget[];
}

export interface CohortData {
  cohortId: string;
  period: string; // e.g., '2026-01'
  initialCustomers: number;
  retentionByPeriod: number[]; // percentage retention per month/week
  repeatPurchaseRate: number;
  lifetimeValue: number;
}

export type AttributionModel =
  | 'FIRST_TOUCH'
  | 'LAST_TOUCH'
  | 'LINEAR'
  | 'POSITION_BASED'
  | 'TIME_DECAY';

export interface MarketingAttributionResult {
  campaignId: string;
  campaignName: string;
  model: AttributionModel;
  attributedRevenue: number;
  attributedConversions: number;
}

export interface SalesForecastResult {
  horizonDays: 30 | 90;
  projectedRevenue: number;
  projectedOrders: number;
  projectedDemandUnits: number;
  recommendedStockReorder: number;
  seasonalityMultiplier: number;
}

export interface Customer360Profile {
  customerId: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  totalReturns: number;
  totalSessions: number;
  wishlistCount: number;
  loyaltyPoints: number;
  reviewsSubmitted: number;
  supportTicketsCount: number;
  marketingEngagementsCount: number;
  timeline: { eventType: string; timestamp: Date; detail: string }[];
}

export interface ReportFilter {
  field: string;
  operator: 'EQUALS' | 'CONTAINS' | 'GREATER_THAN' | 'LESS_THAN';
  value: any;
}

export interface DynamicReportSpec {
  reportName: string;
  filters?: ReportFilter[];
  groupBy?: string;
  pivotBy?: string;
}

export interface ExportedReport {
  reportName: string;
  format: 'CSV' | 'EXCEL' | 'JSON';
  content: string;
}
