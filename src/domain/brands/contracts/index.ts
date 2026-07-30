import { Identifier, Slug, SeoMetadata } from '../..';

export interface IBrand {
  readonly id: Identifier;
  readonly name: string;
  readonly slug: Slug;
  readonly logoUrl?: string;
  readonly websiteUrl?: string;
  readonly isActive: boolean;
  readonly seo?: SeoMetadata;
}
