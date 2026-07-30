/**
 * Delivery Request Wrappers
 * @module delivery/requests
 */

import { IDeliveryContext } from '../contracts';
import { PaginationOptions, CursorPaginationOptions, SortOption, FilterOption } from '../types';

export interface ApiRequestWrapper<TBody = unknown> {
  readonly body: TBody;
  readonly context: IDeliveryContext;
  readonly pagination?: PaginationOptions | undefined;
  readonly cursorPagination?: CursorPaginationOptions | undefined;
  readonly sort?: readonly SortOption[] | undefined;
  readonly filters?: readonly FilterOption[] | undefined;
}
