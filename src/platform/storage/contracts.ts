export interface StorageObject {
  key: string;
  contentType: string;
  size: number;
  checksum?: string;
}

export interface StorageWriteInput {
  key: string;
  body: ArrayBuffer | Uint8Array | string;
  contentType: string;
  visibility?: 'public' | 'private';
}

export interface StorageDriver {
  put(input: StorageWriteInput): Promise<StorageObject>;
  get(key: string): Promise<StorageObject | null>;
  delete(key: string): Promise<void>;
  createSignedUrl?(key: string, expiresInSeconds: number): Promise<string>;
}
