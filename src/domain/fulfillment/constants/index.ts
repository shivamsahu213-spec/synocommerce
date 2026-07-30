/**
 * Fulfillment Domain Constants
 *
 * @module domain/fulfillment/constants
 */

import { TaskPriority } from '../types';
import { FulfillmentStatus } from '../value-objects';

export const DEFAULT_TASK_PRIORITY: TaskPriority = 'NORMAL';

export const DEFAULT_FULFILLMENT_STATUS: FulfillmentStatus = 'CREATED';
