export interface StoragePlaceholder {
  module: 'storage';
  status: 'placeholder';
  description: string;
}

export const storage_placeholder: StoragePlaceholder = {
  module: 'storage',
  status: 'placeholder',
  description: 'Reference contract placeholder for the storage module until an implementation is registered.'
};
