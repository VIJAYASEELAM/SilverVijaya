import { ConcurrentExecutionManager } from "../src/execution/ConcurrentExecutionManager";

describe("ConcurrentExecutionManager", () => {
  it("starts executions", () => {
    const manager = new ConcurrentExecutionManager();

    const result = manager.startExecution("wf-1");

    expect(result).toBe(true);

    expect(
      manager.isExecuting("wf-1")
    ).toBe(true);
  });

  it("prevents duplicate executions", () => {
    const manager = new ConcurrentExecutionManager();

    manager.startExecution("wf-2");

    const secondAttempt =
      manager.startExecution("wf-2");

    expect(secondAttempt).toBe(false);
  });

  it("completes executions", () => {
    const manager = new ConcurrentExecutionManager();

    manager.startExecution("wf-3");

    manager.completeExecution("wf-3");

    expect(
      manager.isExecuting("wf-3")
    ).toBe(false);
  });
});