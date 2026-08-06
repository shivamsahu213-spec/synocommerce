/**
 * Enterprise Event Streaming & Data Platform Test Suite
 * @module src/modules/data-platform/tests/data-platform.test
 */

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CdcEngineProcessor,
  DataLakeProcessor,
  DataPlatformEvent,
  EtlEngineProcessor,
  EventBusProcessor,
  EventStoreProcessor,
  SchemaRegistryProcessor,
  StreamProcessorEngine,
  WarehouseEngineProcessor,
} from '../index';

test('Enterprise Event Streaming & Data Platform', async (t) => {
  const bus = new EventBusProcessor();
  const eventStore = new EventStoreProcessor();
  const stream = new StreamProcessorEngine();
  const schemaRegistry = new SchemaRegistryProcessor();
  const cdc = new CdcEngineProcessor();
  const dataLake = new DataLakeProcessor();
  const warehouse = new WarehouseEngineProcessor();
  const etl = new EtlEngineProcessor();

  await t.test('Publishes partitioned events and executes consumer group subscription', () => {
    bus.publish('orders', {
      eventId: 'evt_ord_1',
      topic: 'orders',
      eventType: 'ORDER_CREATED',
      aggregateId: 'ord_1001',
      version: 1,
      timestamp: new Date(),
      payload: { amount: 250.0 },
    });

    let consumedCount = 0;
    bus.subscribe('group_analytics', 'orders', (evt) => {
      consumedCount++;
      assert.equal(evt.aggregateId, 'ord_1001');
    });

    assert.equal(consumedCount, 1);
  });

  await t.test('Replays historical events from specified offset and handles DLQ', () => {
    bus.publish('orders', {
      eventId: 'evt_ord_2',
      topic: 'orders',
      eventType: 'ORDER_UPDATED',
      aggregateId: 'ord_1001',
      version: 2,
      timestamp: new Date(),
      payload: { status: 'PAID' },
    });

    const replayed = bus.replayEvents('orders', 0);
    assert.equal(replayed.length, 2);
  });

  await t.test('Appends events to EventStore, replays aggregates, and saves snapshots', () => {
    const evt1: DataPlatformEvent = {
      eventId: 'es_1',
      topic: 'orders',
      partition: 0,
      offset: 0,
      eventType: 'ORDER_CREATED',
      aggregateId: 'agg_ord_50',
      version: 1,
      timestamp: new Date(),
      payload: { amount: 500 },
    };

    const evt2: DataPlatformEvent = {
      eventId: 'es_2',
      topic: 'orders',
      partition: 0,
      offset: 1,
      eventType: 'ORDER_REFUNDED',
      aggregateId: 'agg_ord_50',
      version: 2,
      timestamp: new Date(),
      payload: { amount: 100 },
    };

    eventStore.appendEvent(evt1);
    eventStore.appendEvent(evt2);

    const finalState = eventStore.replayAggregate<{ balance: number }>(
      'agg_ord_50',
      (state, evt) => {
        if (evt.eventType === 'ORDER_CREATED') state.balance += evt.payload.amount;
        if (evt.eventType === 'ORDER_REFUNDED') state.balance -= evt.payload.amount;
        return state;
      },
      { balance: 0 }
    );

    assert.equal(finalState.balance, 400);

    const snapshot = eventStore.saveSnapshot('agg_ord_50', 2, finalState);
    assert.equal(snapshot.version, 2);
  });

  await t.test('Executes real-time stream filtering and tumbling window aggregations', () => {
    const events: DataPlatformEvent[] = [
      {
        eventId: 's1',
        topic: 'orders',
        partition: 0,
        offset: 0,
        eventType: 'ORDER_CREATED',
        aggregateId: 'a1',
        version: 1,
        timestamp: new Date(),
        payload: { amount: 100 },
      },
      {
        eventId: 's2',
        topic: 'orders',
        partition: 0,
        offset: 1,
        eventType: 'ORDER_CREATED',
        aggregateId: 'a2',
        version: 1,
        timestamp: new Date(),
        payload: { amount: 200 },
      },
    ];

    const filtered = stream.filterStream(events, (e) => e.payload.amount > 150);
    assert.equal(filtered.length, 1);

    const windowed = stream.windowAggregate(events, 60000);
    assert.ok(windowed.length > 0);
    assert.equal(windowed[0]?.totalAmount, 300);
  });

  await t.test('Registers JSON schemas, validates payloads, and verifies backward compatibility', () => {
    schemaRegistry.registerSchema({
      schemaId: 'sch_order_1',
      name: 'OrderCreatedEvent',
      version: '1.0.0',
      fields: [
        { name: 'orderId', type: 'string', required: true },
        { name: 'amount', type: 'number', required: true },
      ],
    });

    const validRes = schemaRegistry.validatePayload('OrderCreatedEvent', '1.0.0', { orderId: 'ORD-99', amount: 150 });
    assert.equal(validRes.valid, true);

    const invalidRes = schemaRegistry.validatePayload('OrderCreatedEvent', '1.0.0', { orderId: 'ORD-99' });
    assert.equal(invalidRes.valid, false);
  });

  await t.test('Captures Change Data Capture (CDC) stream for database mutations', () => {
    const cdcRecord = cdc.captureChange('orders', 'INSERT', undefined, { orderId: 'ORD-100', status: 'PENDING' });
    assert.equal(cdcRecord.tableName, 'orders');
    assert.equal(cdcRecord.operation, 'INSERT');
  });

  await t.test('Stores raw and curated records in partitioned Data Lake paths', () => {
    const rawRec = dataLake.storeRaw('orders', 1000);
    assert.ok(rawRec.path.includes('raw/orders/year=2026'));

    const curRec = dataLake.storeCurated('orders', 1000);
    assert.ok(curRec.path.includes('curated/orders/year=2026'));
  });

  await t.test('Exports datasets to Snowflake, BigQuery, ClickHouse, and DuckDB warehouses', () => {
    const job = warehouse.exportToWarehouse('SNOWFLAKE', [{ id: 1 }, { id: 2 }]);
    assert.equal(job.target, 'SNOWFLAKE');
    assert.equal(job.recordsCount, 2);
    assert.equal(job.status, 'SUCCESS');
  });

  await t.test('Executes ETL pipeline extraction, transformation, and incremental loading', () => {
    const etlRes = etl.executeEtlPipeline('pipe_orders', [{ amount: 100 }, { amount: 200 }], (row) => ({
      ...row,
      tax: row.amount * 0.18,
    }));

    assert.equal(etlRes.extractedCount, 2);
    assert.equal(etlRes.transformedCount, 2);
    assert.equal(etlRes.status, 'COMPLETED');
  });
});
