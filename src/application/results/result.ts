/**
 * Application Result Pattern
 *
 * Explicit success and failure container for application use cases.
 * Avoids throwing exceptions for expected business failures.
 *
 * @module application/results/result
 */

export class Result<T, E = string> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly isFailure: boolean,
    private readonly _value?: T,
    private readonly _error?: E
  ) {
    if (isSuccess && isFailure) {
      throw new Error('InvalidResultState: Result cannot be both success and failure');
    }
  }

  public get value(): T {
    if (!this.isSuccess || this._value === undefined) {
      throw new Error('Cannot retrieve value from a failed result');
    }
    return this._value;
  }

  public get error(): E {
    if (!this.isFailure || this._error === undefined) {
      throw new Error('Cannot retrieve error from a successful result');
    }
    return this._error;
  }

  public static ok<U, E = string>(value: U): Result<U, E> {
    return new Result<U, E>(true, false, value, undefined);
  }

  public static fail<U, E = string>(error: E): Result<U, E> {
    return new Result<U, E>(false, true, undefined, error);
  }

  public static combine<E = string>(results: Result<unknown, E>[]): Result<void, E> {
    for (const result of results) {
      if (result.isFailure) {
        return Result.fail<void, E>(result.error);
      }
    }
    return Result.ok<void, E>(undefined);
  }
}
