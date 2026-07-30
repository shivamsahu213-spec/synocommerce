export interface IProductDuplicateService {
  duplicateProduct(productId: string): Promise<string>;
}
