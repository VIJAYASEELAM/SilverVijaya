import { Workflow } from "../workflows/Workflow";
import { WorkflowStateManager } from "../state/WorkflowStateManager";
import { WorkflowEventBus } from "../events/WorkflowEventBus";

export class WorkflowExecutor {
  constructor(
    private readonly stateManager: WorkflowStateManager,
    private readonly eventBus: WorkflowEventBus
  ) {}

  execute(workflow: Workflow): string[] {
    if (!workflow.active) {
      throw new Error("Workflow is inactive");
    }

    this.stateManager.setState(workflow.id, "running");

    this.eventBus.emit("workflow.started", {
      workflowId: workflow.id
    });

    const results = workflow.steps.map((step) => {
      return `executed:${step.action}`;
    });

    this.stateManager.setState(workflow.id, "completed");

    this.eventBus.emit("workflow.completed", {
      workflowId: workflow.id
    });

    return results;
  }
}