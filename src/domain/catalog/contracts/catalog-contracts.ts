import { Identifier, Money, SeoMetadata,SKU, Slug } from '../..';

export type ProductStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'SCHEDULED';
export type Visibility = 'PUBLIC' | 'HIDDEN' | 'RESTRICTED';

export interface IMediaAssetContract {
  readonly id: Identifier;
  readonly url: string;
  readonly altText?: string;
  readonly mimeType: string;
  readonly displayOrder: number;
}

export interface IAttributeValueContract {
  readonly id: Identifier;
  readonly value: string;
  readonly displayLabel: string;
  readonly hexColor?: string;
}

export interface IAttributeContract {
  readonly id: Identifier;
  readonly code: string;
  readonly name: string;
  readonly values: readonly IAttributeValueContract[];
}

export interface IBrandContract {
  readonly id: Identifier;
  readonly name: string;
  readonly slug: Slug;
  readonly logoUrl?: string;
}

export interface ICategoryContract {
  readonly id: Identifier;
  readonly name: string;
  readonly slug: Slug;
  readonly parentId?: Identifier;
}

export interface ICollectionContract {
  readonly id: Identifier;
  readonly name: string;
  readonly slug: Slug;
  readonly isAutomated: boolean;
}

export interface IVariantContract {
  readonly id: Identifier;
  readonly sku: SKU;
  readonly title: string;
  readonly price: Money;
  readonly compareAtPrice?: Money;
  readonly attributes: readonly IAttributeValueContract[];
  readonly media: readonly IMediaAssetContract[];
}

export interface ISearchMetadata {
  readonly keywords: readonly string[];
  readonly searchWeight: number;
  readonly tags: readonly string[];
}

export interface IProductContract {
  readonly id: Identifier;
  readonly title: string;
  readonly slug: Slug;
  readonly description?: string;
  readonly status: ProductStatus;
  readonly visibility: Visibility;
  readonly brand?: IBrandContract;
  readonly categories: readonly ICategoryContract[];
  readonly collections: readonly ICollectionContract[];
  readonly variants: readonly IVariantContract[];
  readonly seo?: SeoMetadata;
  readonly searchMetadata?: ISearchMetadata;
}
