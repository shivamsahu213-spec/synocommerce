/**
 * GraphQL Playground & Explorer Application Controller
 * @module apps/graphql-playground/src/playground-app
 */

import { SynoGraphQLFederationEngine } from '@graphql-federation/federation-engine';

export class GraphQLPlaygroundController {
  private engine: SynoGraphQLFederationEngine;

  constructor() {
    this.engine = new SynoGraphQLFederationEngine();
  }

  public getEngine(): SynoGraphQLFederationEngine {
    return this.engine;
  }
}
