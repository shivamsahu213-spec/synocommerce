export interface ScheduledTask {
  name: string;
  expression: string;
  run(): Promise<void> | void;
}

export interface Scheduler {
  register(task: ScheduledTask): void;
  list(): ScheduledTask[];
}
