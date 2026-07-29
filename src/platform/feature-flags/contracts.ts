export interface FeatureFlagContext {
  brandCode: string;
  environment: string;
  locale?: string;
  customerSegment?: string;
}

export interface FeatureFlagResolver {
  isEnabled(flag: string, context: FeatureFlagContext): boolean;
}
