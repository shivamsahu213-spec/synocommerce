import { Identifier, Slug, SKU, Money, Weight, Dimension, SeoMetadata } from '../..';
import { ProductPublicationState, ProductType } from '../types';

export interface IProductVariant {
  readonly id: Identifier;
  readonly sku: SKU;
  readonly title: string;
  readonly price: Money;
  readonly compareAtPrice?: Money;
  readonly weight?: Weight;
  readonly dimension?: Dimension;
}

export interface IProduct {
  readonly id: Identifier;
  readonly title: string;
  readonly slug: Slug;
  readonly productType: ProductType;
  readonly state: ProductPublicationState;
  readonly variants: readonly IProductVariant[];
  readonly seo?: SeoMetadata;
}
