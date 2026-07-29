export type PipelineStep<TValue> = (input: TValue) => Promise<TValue> | TValue;

export interface Pipeline<TValue> {
  use(step: PipelineStep<TValue>): Pipeline<TValue>;
  run(input: TValue): Promise<TValue>;
}
