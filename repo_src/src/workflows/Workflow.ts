export interface WorkflowStep {
  id: string;
  action: string;
  retryable?: boolean;
}

export interface Workflow {
  id: string;
  name: string;
  steps: WorkflowStep[];
  active: boolean;
}