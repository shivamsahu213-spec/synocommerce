export interface UploadDescriptor {
  filename: string;
  contentType: string;
  size: number;
}

export interface UploadPolicy {
  maxBytes: number;
  allowedMimeTypes: string[];
}

export interface UploadValidator {
  validate(file: UploadDescriptor, policy: UploadPolicy): boolean;
}
