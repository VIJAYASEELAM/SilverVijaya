import { WorkflowExecutor } from "../src/execution/WorkflowExecutor";
import { WorkflowStateManager } from "../src/state/WorkflowStateManager";
import { WorkflowEventBus } from "../src/events/WorkflowEventBus";

describe("WorkflowExecutor", () => {
  it("executes active workflow steps", () => {
    const stateManager = new WorkflowStateManager();
    const eventBus = new WorkflowEventBus();

    const executor = new WorkflowExecutor(
      stateManager,
      eventBus
    );

    const result = executor.execute({
      id: "wf-1",
      name: "Order Flow",
      active: true,
      steps: [
        {
          id: "step-1",
          action: "send-email"
        }
      ]
    });

    expect(result).toEqual([
      "executed:send-email"
    ]);

    expect(
      stateManager.getState("wf-1")
    ).toBe("completed");
  });

  it("throws for inactive workflows", () => {
    const stateManager = new WorkflowStateManager();
    const eventBus = new WorkflowEventBus();

    const executor = new WorkflowExecutor(
      stateManager,
      eventBus
    );

    expect(() =>
      executor.execute({
        id: "wf-2",
        name: "Inactive Flow",
        active: false,
        steps: []
      })
    ).toThrow("Workflow is inactive");
  });
});