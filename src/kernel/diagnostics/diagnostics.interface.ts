/**
 * Kernel Diagnostics & Health Contracts
 * @module kernel/diagnostics/diagnostics.interface
 */

export interface ModuleDiagnosticsReport {
  readonly moduleName: string;
  readonly status: string;
  readonly hasMissingDependencies: boolean;
  readonly missingDependencies: readonly string[];
  readonly versionConflicts: readonly string[];
}

export interface PluginDiagnosticsReport {
  readonly pluginId: string;
  readonly status: string;
  readonly sandboxViolations: number;
}

export interface KernelDiagnosticsReport {
  readonly timestamp: Date;
  readonly overallHealth: 'HEALTHY' | 'DEGRADED' | 'CRITICAL';
  readonly modules: readonly ModuleDiagnosticsReport[];
  readonly plugins: readonly PluginDiagnosticsReport[];
}

export interface IKernelDiagnostics {
  runDiagnostics(): Promise<KernelDiagnosticsReport>;
}
