export interface SchedulerPlaceholder {
  module: 'scheduler';
  status: 'placeholder';
  description: string;
}

export const scheduler_placeholder: SchedulerPlaceholder = {
  module: 'scheduler',
  status: 'placeholder',
  description: 'Reference contract placeholder for the scheduler module until an implementation is registered.'
};
