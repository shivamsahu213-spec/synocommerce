/**
 * Catalog & Customer DTO Contracts
 * @module application/dto/catalog.dto
 */

export interface ProductVariantDTO {
  readonly id: string;
  readonly sku: string;
  readonly title: string;
  readonly price: number;
}

export interface ProductDTO {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly productType: string;
  readonly state: string;
  readonly variants: readonly ProductVariantDTO[];
}

export interface CategoryDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly parentId?: string | undefined;
}

export interface SearchProductsInput {
  readonly query: string;
  readonly categorySlug?: string | undefined;
  readonly minPrice?: number | undefined;
  readonly maxPrice?: number | undefined;
  readonly page?: number | undefined;
  readonly limit?: number | undefined;
}

export interface CustomerDTO {
  readonly id: string;
  readonly email: string;
  readonly status: string;
  readonly firstName: string;
  readonly lastName: string;
}
