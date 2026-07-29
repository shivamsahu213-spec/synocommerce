export interface MediaAsset {
  id: string;
  source: string;
  contentType: string;
  width?: number;
  height?: number;
}

export interface MediaTransformer {
  transform(asset: MediaAsset, preset: string): Promise<MediaAsset>;
}
