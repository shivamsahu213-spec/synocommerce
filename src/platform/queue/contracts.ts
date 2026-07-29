export interface QueueJob<TPayload = unknown> {
  name: string;
  payload: TPayload;
  attempts?: number;
  delayMs?: number;
}

export interface QueueDriver {
  dispatch<TPayload>(job: QueueJob<TPayload>): Promise<void>;
  schedule<TPayload>(job: QueueJob<TPayload>, runAt: string): Promise<void>;
}
