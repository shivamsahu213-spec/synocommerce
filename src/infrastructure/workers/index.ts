/**
 * Infrastructure Background Worker Adapter
 * @module infrastructure/workers
 */

export interface IBackgroundWorker {
  registerProcessor(jobName: string, processor: (data: unknown) => Promise<void>): void;
  enqueue(jobName: string, data: unknown): Promise<string>;
}

export class BackgroundWorkerAdapter implements IBackgroundWorker {
  public registerProcessor(jobName: string, processor: (data: unknown) => Promise<void>): void {}
  public async enqueue(jobName: string, data: unknown): Promise<string> {
    return `job_${crypto.randomUUID()}`;
  }
}
