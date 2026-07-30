/**
 * Syno Extension Packager & Marketplace Publisher
 * @module tools/cli/packaging/packager
 */

export interface PackageManifest {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly author: string;
  readonly packageType: 'plugin' | 'theme' | 'module';
  readonly checksum: string;
}

export class PackagerEngine {
  public packageExtension(id: string, name: string, version: string, type: 'plugin' | 'theme' | 'module'): {
    fileName: string;
    manifest: PackageManifest;
  } {
    const fileName = `${id}-${version}.synopkg`;
    const manifest: PackageManifest = {
      id,
      name,
      version,
      author: 'Developer Platform',
      packageType: type,
      checksum: 'sha256_mock_checksum_9921',
    };

    return {
      fileName,
      manifest,
    };
  }
}
