export class ConcurrentExecutionManager {
  private activeExecutions: Set<string>;

  constructor() {
    this.activeExecutions = new Set();
  }

  startExecution(workflowId: string): boolean {
    if (this.activeExecutions.has(workflowId)) {
      return false;
    }

    this.activeExecutions.add(workflowId);

    return true;
  }

  completeExecution(workflowId: string): void {
    this.activeExecutions.delete(workflowId);
  }

  isExecuting(workflowId: string): boolean {
    return this.activeExecutions.has(workflowId);
  }

  activeCount(): number {
    return this.activeExecutions.size;
  }
}