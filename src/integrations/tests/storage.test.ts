/**
 * Enterprise Object Storage & CDN Platform Test Suite
 * @module src/integrations/tests/storage.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ObjectStorageProvider,
  ImageOptimizerEngine,
  CdnProviderService,
  StorageSecurityEngine,
} from '../storage';

test('Enterprise Object Storage & CDN Platform', async (t) => {
  const storage = new ObjectStorageProvider();
  const optimizer = new ImageOptimizerEngine();
  const cdn = new CdnProviderService();

  await t.test('Uploads file with SHA256 checksum computation and CDN URL generation', async () => {
    const fileContent = Buffer.from('SynoCommerce Test Product Image Data', 'utf-8');
    const metadata = await storage.uploadFile('product_thumb.png', 'image/png', fileContent, {
      providerPreference: 'AWS_S3',
      folder: 'catalog',
    });

    assert.equal(metadata.originalName, 'product_thumb.png');
    assert.equal(metadata.storageProvider, 'AWS_S3');
    assert.ok(metadata.fileKey.startsWith('catalog/'));
    assert.ok(metadata.sha256Checksum.length === 64);
    assert.ok(metadata.cdnUrl.includes('synocommerce.com'));
  });

  await t.test('Rejects malicious virus upload containing EICAR test signature', async () => {
    const virusContent = Buffer.from('EICAR-STANDARD-ANTIVIRUS-TEST-FILE!', 'utf-8');
    await assert.rejects(
      async () => {
        await storage.uploadFile('virus.png', 'image/png', virusContent);
      },
      { message: /VIRUS_DETECTED/ }
    );
  });

  await t.test('Rejects forbidden MIME types for security compliance', async () => {
    const exeContent = Buffer.from('MZ_EXECUTABLE_HEADER', 'utf-8');
    await assert.rejects(
      async () => {
        await storage.uploadFile('malicious.exe', 'application/x-msdownload', exeContent);
      },
      { message: /UNSUPPORTED_MIME_TYPE/ }
    );
  });

  await t.test('Generates presigned upload and download URLs with expiration', async () => {
    const urls = await storage.generatePresignedUrls('catalog/product_101.png', 1800);
    assert.equal(urls.fileKey, 'catalog/product_101.png');
    assert.ok(urls.uploadUrl.includes('token='));
    assert.ok(urls.downloadUrl.includes('token='));
  });

  await t.test('Executes soft delete and file restoration', async () => {
    const content = Buffer.from('Soft Delete File Data', 'utf-8');
    const metadata = await storage.uploadFile('doc.pdf', 'application/pdf', content);

    const deleted = await storage.softDeleteFile(metadata.fileKey);
    assert.equal(deleted, true);
    assert.equal(storage.getFileMetadata(metadata.fileKey)?.isSoftDeleted, true);

    const restored = await storage.restoreFile(metadata.fileKey);
    assert.equal(restored, true);
    assert.equal(storage.getFileMetadata(metadata.fileKey)?.isSoftDeleted, false);
  });

  await t.test('Initializes multipart upload session for large files', async () => {
    const session = await storage.startMultipartUpload('videos/demo.mp4', 50); // 50MB
    assert.equal(session.fileKey, 'videos/demo.mp4');
    assert.equal(session.totalParts, 10);
    assert.ok(session.uploadId.startsWith('mpu_'));
  });

  await t.test('Optimizes images into AVIF/WebP formats with size reduction', () => {
    const optWebp = optimizer.optimizeImage('products/shoe.png', 1000000, { format: 'webp' });
    assert.equal(optWebp.formatUsed, 'WEBP');
    assert.equal(optWebp.optimizedSizeBytes, 650000);
    assert.equal(optWebp.savingsPercentage, 35);

    const optAvif = optimizer.optimizeImage('banners/hero.png', 2000000, { format: 'avif' });
    assert.equal(optAvif.formatUsed, 'AVIF');
    assert.equal(optAvif.optimizedSizeBytes, 1000000);
    assert.equal(optAvif.savingsPercentage, 50);
  });

  await t.test('Triggers CDN cache invalidation across edge locations', async () => {
    const inv = await cdn.invalidateCache(['/products/*', '/banners/*'], 'CLOUDFRONT');
    assert.equal(inv.status, 'COMPLETED');
    assert.ok(inv.invalidationId.startsWith('inv_'));
  });
});
