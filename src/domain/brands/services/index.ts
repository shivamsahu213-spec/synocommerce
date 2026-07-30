export interface IBrandVerificationService {
  verifyBrandAuthenticity(brandId: string): Promise<boolean>;
}
