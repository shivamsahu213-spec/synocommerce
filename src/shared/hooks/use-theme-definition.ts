import { getAppRuntimeConfig } from '@config/runtime.config';
import { themeRegistry } from '@theme/registry';

export function useThemeDefinition() {
  const { themeCode } = getAppRuntimeConfig();
  return themeRegistry[themeCode] ?? themeRegistry.core;
}
