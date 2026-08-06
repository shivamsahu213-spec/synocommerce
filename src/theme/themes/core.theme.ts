import { designTokens } from '@theme/tokens';

import type { ThemeDefinition } from '@/types/theme';

export const coreTheme: ThemeDefinition = {
  code: 'core',
  name: 'Core Theme',
  tokens: designTokens,
  layout: {
    header: 'enterprise',
    footer: 'composable',
    homepage: 'config-driven'
  },
  components: {
    button: 'solid',
    card: 'elevated',
    input: 'default'
  }
};
