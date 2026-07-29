export interface PipelinePlaceholder {
  module: 'pipeline';
  status: 'placeholder';
  description: string;
}

export const pipeline_placeholder: PipelinePlaceholder = {
  module: 'pipeline',
  status: 'placeholder',
  description: 'Reference contract placeholder for the pipeline module until an implementation is registered.'
};
