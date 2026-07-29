export interface QueuePlaceholder {
  module: 'queue';
  status: 'placeholder';
  description: string;
}

export const queue_placeholder: QueuePlaceholder = {
  module: 'queue',
  status: 'placeholder',
  description: 'Reference contract placeholder for the queue module until an implementation is registered.'
};
