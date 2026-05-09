export class ExecutionTimeoutManager {
  private activeTimeouts: Map<string, NodeJS.Timeout>;

  constructor() {
    this.activeTimeouts = new Map();
  }

  startTimeout(
    workflowId: string,
    timeoutMs: number,
    onTimeout: () => void
  ): void {
    const timeout = setTimeout(() => {
      onTimeout();
      this.activeTimeouts.delete(workflowId);
    }, timeoutMs);

    this.activeTimeouts.set(workflowId, timeout);
  }

  cancelTimeout(workflowId: string): boolean {
    const timeout = this.activeTimeouts.get(workflowId);

    if (!timeout) {
      return false;
    }

    clearTimeout(timeout);

    this.activeTimeouts.delete(workflowId);

    return true;
  }

  hasTimeout(workflowId: string): boolean {
    return this.activeTimeouts.has(workflowId);
  }
}