export type LocaleDirection = 'ltr' | 'rtl';

export interface LocaleDefinition {
  code: string;
  direction: LocaleDirection;
  dictionaries?: string[];
}

export interface LocalizationRegistry {
  getLocale(code: string): LocaleDefinition | null;
  listLocales(): LocaleDefinition[];
}
