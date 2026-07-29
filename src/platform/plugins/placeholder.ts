export interface PluginsPlaceholder {
  module: 'plugins';
  status: 'placeholder';
  description: string;
}

export const plugins_placeholder: PluginsPlaceholder = {
  module: 'plugins',
  status: 'placeholder',
  description: 'Reference contract placeholder for the plugins module until an implementation is registered.'
};
