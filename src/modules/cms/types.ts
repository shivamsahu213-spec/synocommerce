/**
 * Enterprise Visual CMS Block & Document Type Definitions
 * @module modules/cms/types
 */

export type CmsBlockType =
  | 'HERO'
  | 'PRODUCT_GRID'
  | 'DOCTOR_RECOMMENDATION'
  | 'HEALTH_GOALS'
  | 'TESTIMONIALS'
  | 'FAQ_ACCORDION'
  | 'BANNER'
  | 'NEWSLETTER'
  | 'TRUST_BADGES';

export interface CmsBlockStyle {
  paddingTop?: string | undefined;
  paddingBottom?: string | undefined;
  backgroundColor?: string | undefined;
  textColor?: string | undefined;
  borderRadius?: string | undefined;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | undefined;
}

export interface CmsBlockInstance {
  id: string;
  type: CmsBlockType;
  props: Record<string, any>;
  styles?: CmsBlockStyle | undefined;
  isVisible: boolean;
}

export interface CmsSeoMeta {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string | undefined;
  ogImage?: string | undefined;
}

export interface CmsPageDocument {
  pageId: string;
  slug: string;
  title: string;
  status: 'DRAFT' | 'PUBLISHED';
  version: number;
  blocks: CmsBlockInstance[];
  seo: CmsSeoMeta;
  publishedAt?: Date | undefined;
  updatedAt: Date;
}
