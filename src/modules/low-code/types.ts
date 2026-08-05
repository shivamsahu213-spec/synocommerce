/**
 * Enterprise Low-Code Designer Module Types
 * @module src/modules/low-code/types
 */

export type LowCodeComponentType =
  | 'TEXT'
  | 'HEADING'
  | 'IMAGE'
  | 'VIDEO'
  | 'BUTTON'
  | 'CARD'
  | 'GRID'
  | 'CONTAINER'
  | 'TABS'
  | 'ACCORDION'
  | 'MODAL'
  | 'DRAWER'
  | 'CAROUSEL'
  | 'TABLE'
  | 'DATA_GRID'
  | 'FORM'
  | 'INPUT'
  | 'TEXTAREA'
  | 'SELECT'
  | 'CHECKBOX'
  | 'RADIO'
  | 'DATE_PICKER'
  | 'FILE_UPLOAD'
  | 'CHARTS'
  | 'MAPS'
  | 'TIMELINE'
  | 'KANBAN'
  | 'CALENDAR'
  | 'RICH_TEXT'
  | 'CODE_EDITOR';

export type LowCodeAppType =
  | 'CRM_APP'
  | 'INVENTORY_APP'
  | 'WAREHOUSE_APP'
  | 'HR_APP'
  | 'FINANCE_APP'
  | 'SUPPORT_APP'
  | 'APPROVAL_APP'
  | 'ADMIN_APP'
  | 'ANALYTICS_APP'
  | 'CUSTOM_INTERNAL_TOOL';

export type DataSourceType =
  | 'REST_API'
  | 'GRAPHQL'
  | 'POSTGRESQL'
  | 'MYSQL'
  | 'MONGODB'
  | 'FIREBASE'
  | 'SUPABASE'
  | 'SALESFORCE'
  | 'SAP'
  | 'CSV'
  | 'JSON';

export interface ComponentNode {
  id: string;
  type: LowCodeComponentType;
  label: string;
  props: Record<string, any>;
  children?: ComponentNode[] | undefined;
  visibleCondition?: string | undefined; // Formula condition e.g. "IF(status == 'ACTIVE', true, false)"
}

export interface LowCodeAppSchema {
  appId: string;
  name: string;
  type: LowCodeAppType;
  version: string;
  rootContainer: ComponentNode;
  dataSource: DataSourceType;
  theme: {
    primaryColor: string;
    mode: 'DARK' | 'LIGHT';
  };
  published: boolean;
}

export interface FormulaEvaluationResult {
  value: any;
  error?: string | undefined;
}
