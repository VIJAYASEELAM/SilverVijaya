import { Workflow } from "../workflows/Workflow";

export class InMemoryWorkflowStore {
  private workflows: Map<string, Workflow>;

  constructor() {
    this.workflows = new Map();
  }

  save(workflow: Workflow): void {
    this.workflows.set(workflow.id, workflow);
  }

  get(workflowId: string): Workflow | undefined {
    return this.workflows.get(workflowId);
  }

  delete(workflowId: string): boolean {
    return this.workflows.delete(workflowId);
  }

  getAll(): Workflow[] {
    return Array.from(this.workflows.values());
  }
}