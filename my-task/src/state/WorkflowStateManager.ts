export type WorkflowStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed";

export class WorkflowStateManager {
  private states: Map<string, WorkflowStatus>;

  constructor() {
    this.states = new Map();
  }

  setState(workflowId: string, status: WorkflowStatus): void {
    this.states.set(workflowId, status);
  }

  getState(workflowId: string): WorkflowStatus | undefined {
    return this.states.get(workflowId);
  }

  clearState(workflowId: string): void {
    this.states.delete(workflowId);
  }
}