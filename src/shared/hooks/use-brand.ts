import { getAppRuntimeConfig } from '@config/runtime.config';
import { brandRegistry } from '@theme/registry';

export function useBrand() {
  const { brandCode } = getAppRuntimeConfig();
  return brandRegistry[brandCode] ?? brandRegistry.default;
}
