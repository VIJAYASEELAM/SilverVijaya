import { Workflow } from "../workflows/Workflow";
import { WorkflowScheduler } from "../scheduler/WorkflowScheduler";
import { WorkflowLifecycle } from "../workflows/WorkflowLifecycle";

export class WorkflowExecutionCoordinator {
  constructor(
    private readonly scheduler: WorkflowScheduler,
    private readonly lifecycle: WorkflowLifecycle
  ) {}

  scheduleWorkflow(
    workflow: Workflow,
    delay: number,
    callback: () => void
  ): void {
    this.scheduler.schedule(
      workflow,
      delay,
      callback
    );
  }
}