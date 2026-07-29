export interface ExtensionsPlaceholder {
  module: 'extensions';
  status: 'placeholder';
  description: string;
}

export const extensions_placeholder: ExtensionsPlaceholder = {
  module: 'extensions',
  status: 'placeholder',
  description: 'Reference contract placeholder for the extensions module until an implementation is registered.'
};
