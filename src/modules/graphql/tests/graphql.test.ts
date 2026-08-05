/**
 * Enterprise GraphQL Federation Platform Test Suite
 * @module src/modules/graphql/tests/graphql.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { SynoGraphQLFederationEngine } from '../federation-engine';

test('Enterprise GraphQL Federation Platform Engine', async (t) => {
  const engine = new SynoGraphQLFederationEngine();

  await t.test('Verifies registration of all 13 federated subgraphs', () => {
    const subgraphs = engine.getSubgraphs();
    assert.equal(subgraphs.length, 13);
    assert.ok(subgraphs.some((s) => s.name === 'CATALOG'));
    assert.ok(subgraphs.some((s) => s.name === 'ORDERS'));
    assert.ok(subgraphs.some((s) => s.name === 'OMNICHANNEL'));
  });

  await t.test('Executes federated GraphQL query and returns telemetry tracing', async () => {
    const query = 'query GetProducts { products { id name priceUsd } }';
    const res = await engine.executeQuery({ query });

    assert.ok(res.data);
    assert.equal(res.data.products.length, 1);
    assert.equal(res.data.products[0].id, 'prod_101');
    assert.ok(res.extensions?.tracingMs);
  });

  await t.test('Registers and executes Automatic Persisted Query (APQ)', async () => {
    const query = 'query GetCatalog { products { id name } }';
    const hash = engine.registerPersistedQuery(query);

    const res = await engine.executeQuery({
      extensions: {
        persistedQuery: {
          version: 1,
          sha256Hash: hash,
        },
      },
    });

    assert.ok(res.data);
    assert.equal(engine.getApqCacheSize() >= 1, true);
  });

  await t.test('Analyzes query complexity and blocks queries exceeding depth limit', async () => {
    const DeepQuery = `
      query DeepComplexity {
        catalog {
          products {
            variants {
              inventory {
                warehouse {
                  region {
                    store {
                      manager {
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const complexity = engine.analyzeQueryComplexity(DeepQuery);
    assert.equal(complexity.allowed, false);

    const res = await engine.executeQuery({ query: DeepQuery });
    assert.ok(res.errors);
    assert.equal(res.errors[0]!.message, 'QUERY_EXCEEDS_MAX_COMPLEXITY_OR_DEPTH');
  });
});
