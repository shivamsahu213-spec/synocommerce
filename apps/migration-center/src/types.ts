/**
 * Migration Center Application Types
 * @module apps/migration-center/src/types
 */

export type MigrationStep = 'SELECT_SOURCE' | 'CONFIGURE_MAPPING' | 'VALIDATE_DATA' | 'EXECUTE_IMPORT' | 'SUMMARY_REPORT';

export interface MigrationWizardState {
  currentStep: MigrationStep;
  sourcePlatform?: string | undefined;
  recordCount: number;
}
