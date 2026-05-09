import { Workflow } from "../workflows/Workflow";

export class WorkflowValidator {
  validate(workflow: Workflow): void {
    if (!workflow.name.trim()) {
      throw new Error("Workflow name is required");
    }

    if (workflow.steps.length === 0) {
      throw new Error("Workflow must contain at least one step");
    }

    const stepIds = new Set<string>();

    for (const step of workflow.steps) {
      if (stepIds.has(step.id)) {
        throw new Error("Duplicate workflow step id");
      }

      stepIds.add(step.id);
    }
  }
}