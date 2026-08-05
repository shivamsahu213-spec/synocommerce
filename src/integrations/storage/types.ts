/**
 * Enterprise Object Storage & CDN Platform Types
 * @module src/integrations/storage/types
 */

export type StorageProviderType =
  | 'AWS_S3'
  | 'CLOUDFLARE_R2'
  | 'CLOUDINARY'
  | 'GCS'
  | 'AZURE_BLOB'
  | 'MINIO'
  | 'DIGITALOCEAN_SPACES'
  | 'BACKBLAZE_B2';

export type CdnProviderType = 'CLOUDFRONT' | 'CLOUDFLARE_CDN' | 'FASTLY' | 'IMAGE_CDN';

export type StorageClass = 'STANDARD' | 'INTELLIGENT_TIERING' | 'GLACIER' | 'DEEP_ARCHIVE';

export interface FileObjectMetadata {
  fileKey: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  sha256Checksum: string;
  storageProvider: StorageProviderType;
  storageClass: StorageClass;
  versionId: string;
  isSoftDeleted: boolean;
  uploadedAt: Date;
  cdnUrl: string;
  customMetadata?: Record<string, string> | undefined;
}

export interface UploadOptions {
  folder?: string | undefined;
  providerPreference?: StorageProviderType | undefined;
  storageClass?: StorageClass | undefined;
  virusScanRequired?: boolean | undefined;
  customMetadata?: Record<string, string> | undefined;
}

export interface PresignedUrlResult {
  fileKey: string;
  uploadUrl: string;
  downloadUrl: string;
  expiresAt: Date;
  headers?: Record<string, string> | undefined;
}

export interface MultipartUploadSession {
  uploadId: string;
  fileKey: string;
  partSizeMb: number;
  totalParts: number;
  uploadedParts: { partNumber: number; etag: string }[];
}

export interface ImageOptimizationOptions {
  format?: 'webp' | 'avif' | 'jpeg' | 'png' | undefined;
  width?: number | undefined;
  height?: number | undefined;
  quality?: number | undefined;
  watermarkText?: string | undefined;
  removeExif?: boolean | undefined;
}

export interface OptimizationResult {
  originalKey: string;
  optimizedKey: string;
  optimizedUrl: string;
  originalSizeBytes: number;
  optimizedSizeBytes: number;
  savingsPercentage: number;
  formatUsed: string;
}
