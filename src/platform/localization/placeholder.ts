export interface LocalizationPlaceholder {
  module: 'localization';
  status: 'placeholder';
  description: string;
}

export const localization_placeholder: LocalizationPlaceholder = {
  module: 'localization',
  status: 'placeholder',
  description: 'Reference contract placeholder for the localization module until an implementation is registered.'
};
