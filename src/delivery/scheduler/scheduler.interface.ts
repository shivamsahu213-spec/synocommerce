/**
 * Scheduler Contracts
 * @module delivery/scheduler/scheduler.interface
 */

export interface IScheduledTask {
  readonly taskName: string;
  readonly cronSchedule: string;
  execute(): Promise<void>;
}
