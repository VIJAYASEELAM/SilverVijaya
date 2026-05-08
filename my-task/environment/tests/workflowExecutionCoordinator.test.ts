import { WorkflowExecutionCoordinator } from "../src/execution/WorkflowExecutionCoordinator";
import { WorkflowScheduler } from "../src/scheduler/WorkflowScheduler";
import { WorkflowLifecycle } from "../src/workflows/WorkflowLifecycle";

describe("WorkflowExecutionCoordinator", () => {
  it("does not schedule archived workflows", () => {
    const scheduler = new WorkflowScheduler();

    const lifecycle = new WorkflowLifecycle();

    const coordinator =
      new WorkflowExecutionCoordinator(
        scheduler,
        lifecycle
      );

    lifecycle.archive("wf-1");

    coordinator.scheduleWorkflow(
      {
        id: "wf-1",
        name: "Archived Workflow",
        active: true,
        steps: []
      },
      1000,
      () => {}
    );

    expect(
      scheduler.isScheduled("wf-1")
    ).toBe(false);
  });
});