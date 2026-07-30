/**
 * Application Transaction & Unit of Work Contracts
 *
 * Provides transactional boundaries across multiple repository operations.
 *
 * @module application/transactions/transaction.interface
 */

export type IsolationLevel = 'READ_UNCOMMITTED' | 'READ_COMMITTED' | 'REPEATABLE_READ' | 'SERIALIZABLE';

export interface TransactionOptions {
  readonly isolationLevel?: IsolationLevel | undefined;
  readonly timeoutMs?: number | undefined;
  readonly readOnly?: boolean | undefined;
}

export interface IUnitOfWork {
  readonly transactionId: string;
  readonly isActive: boolean;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

export interface ITransactionManager {
  beginTransaction(options?: TransactionOptions | undefined): Promise<IUnitOfWork>;
  executeInTransaction<T>(operation: (uow: IUnitOfWork) => Promise<T>, options?: TransactionOptions | undefined): Promise<T>;
}
