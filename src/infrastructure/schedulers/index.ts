/**
 * Infrastructure Cron Scheduler Adapter
 * @module infrastructure/schedulers
 */

export interface ICronScheduler {
  scheduleTask(cronExpression: string, task: () => Promise<void>): string;
  cancelTask(taskId: string): void;
}

export class CronSchedulerAdapter implements ICronScheduler {
  public scheduleTask(cronExpression: string, task: () => Promise<void>): string {
    return `task_${crypto.randomUUID()}`;
  }
  public cancelTask(taskId: string): void {}
}
