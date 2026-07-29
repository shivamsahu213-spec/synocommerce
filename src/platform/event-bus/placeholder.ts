export interface EventBusPlaceholder {
  module: 'event-bus';
  status: 'placeholder';
  description: string;
}

export const event_bus_placeholder: EventBusPlaceholder = {
  module: 'event-bus',
  status: 'placeholder',
  description: 'Reference contract placeholder for the event-bus module until an implementation is registered.'
};
