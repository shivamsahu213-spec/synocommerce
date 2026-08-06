import { Identifier, SeoMetadata,Slug } from '../..';

export interface IBrand {
  readonly id: Identifier;
  readonly name: string;
  readonly slug: Slug;
  readonly logoUrl?: string | undefined;
  readonly websiteUrl?: string | undefined;
  readonly isActive: boolean;
  readonly seo?: SeoMetadata | undefined;
}
