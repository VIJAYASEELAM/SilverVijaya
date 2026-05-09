import { Workflow } from "../workflows/Workflow";
import { InMemoryWorkflowStore } from "../state/InMemoryWorkflowStore";
import { WorkflowValidator } from "../validators/WorkflowValidator";

export class WorkflowService {
  constructor(
    private readonly store: InMemoryWorkflowStore,
    private readonly validator: WorkflowValidator
  ) {}

  register(workflow: Workflow): void {
    this.validator.validate(workflow);

    this.store.save(workflow);
  }

  getWorkflow(
    workflowId: string
  ): Workflow | undefined {
    return this.store.get(workflowId);
  }

  deleteWorkflow(workflowId: string): boolean {
    return this.store.delete(workflowId);
  }

  listWorkflows(): Workflow[] {
    return this.store.getAll();
  }
}