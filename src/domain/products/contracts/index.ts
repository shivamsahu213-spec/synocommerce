import { Dimension, Identifier, Money, SeoMetadata,SKU, Slug, Weight } from '../..';
import { ProductPublicationState, ProductType } from '../types';

export interface IProductVariant {
  readonly id: Identifier;
  readonly sku: SKU;
  readonly title: string;
  readonly price: Money;
  readonly compareAtPrice?: Money | undefined;
  readonly weight?: Weight | undefined;
  readonly dimension?: Dimension | undefined;
}

export interface IProduct {
  readonly id: Identifier;
  readonly title: string;
  readonly slug: Slug;
  readonly productType: ProductType;
  readonly state: ProductPublicationState;
  readonly variants: readonly IProductVariant[];
  readonly seo?: SeoMetadata | undefined;
}
