export type WorkflowLifecycleState =
  | "draft"
  | "active"
  | "paused"
  | "archived";

export class WorkflowLifecycle {
  private states: Map<string, WorkflowLifecycleState>;

  constructor() {
    this.states = new Map();
  }

  activate(workflowId: string): void {
    this.states.set(workflowId, "active");
  }

  pause(workflowId: string): void {
    this.states.set(workflowId, "paused");
  }

  archive(workflowId: string): void {
    this.states.set(workflowId, "archived");
  }

  getState(
    workflowId: string
  ): WorkflowLifecycleState | undefined {
    return this.states.get(workflowId);
  }
}