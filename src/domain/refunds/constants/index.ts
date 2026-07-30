/**
 * Refunds Domain Constants
 *
 * @module domain/refunds/constants
 */

import { RefundType } from '../types';
import { RefundStatus } from '../value-objects';

export const DEFAULT_REFUND_TYPE: RefundType = 'FULL';

export const DEFAULT_REFUND_STATUS: RefundStatus = 'PENDING';
