export interface DehydratedState<TPayload = unknown> {
  key: string;
  payload: TPayload;
  createdAt: string;
}

export interface HydrationAdapter {
  dehydrate<TPayload>(payload: TPayload, key: string): DehydratedState<TPayload>;
  hydrate<TPayload>(state: DehydratedState<TPayload>): TPayload;
}
