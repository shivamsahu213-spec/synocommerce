/**
 * Dependency Graph Contracts
 *
 * Manages module & plugin dependency graphs, detects circular cycles, and plans upgrade sequences.
 *
 * @module kernel/dependency-graph/dependency-graph.interface
 */

export interface DependencyNode {
  readonly name: string;
  readonly version: string;
  readonly dependencies: readonly { readonly name: string; readonly requiredVersion: string }[];
}

export interface IDependencyGraph {
  addNode(node: DependencyNode): void;
  hasCircularDependency(): boolean;
  detectCycles(): readonly (readonly string[])[];
  getTopologicalOrder(): readonly string[];
  validateVersionCompatibility(): { readonly isCompatible: boolean; readonly conflicts: readonly string[] };
}
