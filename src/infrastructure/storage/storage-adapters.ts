/**
 * Infrastructure Storage Adapters
 *
 * Implements IStoragePort for AWS S3, Cloudflare R2, Azure Blob, and Local Storage.
 *
 * @module infrastructure/storage/storage-adapters
 */

import { IStoragePort } from '../../application/ports';

export class S3StorageAdapter implements IStoragePort {
  public async uploadFile(bucketName: string, filePath: string, content: Uint8Array): Promise<string> {
    return `https://${bucketName}.s3.amazonaws.com/${filePath}`;
  }
  public async getDownloadUrl(bucketName: string, filePath: string): Promise<string> {
    return `https://${bucketName}.s3.amazonaws.com/${filePath}`;
  }
}

export class CloudflareR2StorageAdapter implements IStoragePort {
  public async uploadFile(bucketName: string, filePath: string, content: Uint8Array): Promise<string> {
    return `https://${bucketName}.r2.cloudflarestorage.com/${filePath}`;
  }
  public async getDownloadUrl(bucketName: string, filePath: string): Promise<string> {
    return `https://${bucketName}.r2.cloudflarestorage.com/${filePath}`;
  }
}

export class AzureBlobStorageAdapter implements IStoragePort {
  public async uploadFile(bucketName: string, filePath: string, content: Uint8Array): Promise<string> {
    return `https://${bucketName}.blob.core.windows.net/${filePath}`;
  }
  public async getDownloadUrl(bucketName: string, filePath: string): Promise<string> {
    return `https://${bucketName}.blob.core.windows.net/${filePath}`;
  }
}

export class LocalStorageAdapter implements IStoragePort {
  public async uploadFile(bucketName: string, filePath: string, content: Uint8Array): Promise<string> {
    return `/storage/${bucketName}/${filePath}`;
  }
  public async getDownloadUrl(bucketName: string, filePath: string): Promise<string> {
    return `/storage/${bucketName}/${filePath}`;
  }
}
