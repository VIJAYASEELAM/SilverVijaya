import { Workflow } from "../workflows/Workflow";

export class WorkflowScheduler {
  private scheduled: Map<string, NodeJS.Timeout>;

  constructor() {
    this.scheduled = new Map();
  }

  schedule(
    workflow: Workflow,
    delay: number,
    callback: () => void
  ): void {
    const timeout = setTimeout(() => {
      callback();
      this.scheduled.delete(workflow.id);
    }, delay);

    this.scheduled.set(workflow.id, timeout);
  }

  cancel(workflowId: string): boolean {
    const timeout = this.scheduled.get(workflowId);

    if (!timeout) {
      return false;
    }

    clearTimeout(timeout);
    this.scheduled.delete(workflowId);

    return true;
  }

  isScheduled(workflowId: string): boolean {
    return this.scheduled.has(workflowId);
  }
}