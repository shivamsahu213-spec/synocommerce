export interface KernelPlaceholder {
  module: 'kernel';
  status: 'placeholder';
  description: string;
}

export const kernel_placeholder: KernelPlaceholder = {
  module: 'kernel',
  status: 'placeholder',
  description: 'Reference contract placeholder for the kernel module until an implementation is registered.'
};
