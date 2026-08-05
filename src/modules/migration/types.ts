/**
 * Enterprise Migration Toolkit Module Types
 * @module src/modules/migration/types
 */

export type MigrationSourcePlatform =
  | 'SHOPIFY'
  | 'WOOCOMMERCE'
  | 'MAGENTO_2'
  | 'ADOBE_COMMERCE'
  | 'BIGCOMMERCE'
  | 'OPENCART'
  | 'PRESTASHOP'
  | 'SALESFORCE_COMMERCE_CLOUD'
  | 'SAP_COMMERCE'
  | 'COMMERCETOOLS'
  | 'VENDURE'
  | 'SALEOR'
  | 'MEDUSA'
  | 'CUSTOM_CSV'
  | 'CUSTOM_JSON'
  | 'CUSTOM_XML';

export type MigrationEntityType =
  | 'PRODUCTS'
  | 'VARIANTS'
  | 'CATEGORIES'
  | 'COLLECTIONS'
  | 'CUSTOMERS'
  | 'ADDRESSES'
  | 'ORDERS'
  | 'INVOICES'
  | 'COUPONS'
  | 'GIFT_CARDS'
  | 'REVIEWS'
  | 'MEDIA'
  | 'BLOGS'
  | 'CMS_PAGES'
  | 'NAVIGATION'
  | 'TAXES'
  | 'SHIPPING_RULES'
  | 'INVENTORY'
  | 'WAREHOUSES'
  | 'B2B_COMPANIES'
  | 'PRICE_LISTS';

export interface FieldMappingRule {
  sourceField: string;
  targetField: string;
  defaultValue?: string | undefined;
  transformationScript?: string | undefined;
}

export interface MigrationJobConfig {
  jobId: string;
  sourcePlatform: MigrationSourcePlatform;
  entities: MigrationEntityType[];
  fieldMappings: FieldMappingRule[];
  checksumSha256?: string | undefined;
}

export interface MigrationJobProgress {
  jobId: string;
  totalRecords: number;
  importedRecords: number;
  skippedRecords: number;
  failedRecords: number;
  progressPercentage: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'ROLLED_BACK';
  errors: { recordId: string; message: string }[];
}

export interface RollbackSnapshot {
  snapshotId: string;
  jobId: string;
  createdAt: Date;
  createdEntityIds: { entityType: MigrationEntityType; id: string }[];
}
