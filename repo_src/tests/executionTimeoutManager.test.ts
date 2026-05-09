import { ExecutionTimeoutManager } from "../src/execution/ExecutionTimeoutManager";

describe("ExecutionTimeoutManager", () => {
  it("starts workflow timeouts", () => {
    const manager = new ExecutionTimeoutManager();

    manager.startTimeout(
      "wf-1",
      1000,
      () => {}
    );

    expect(
      manager.hasTimeout("wf-1")
    ).toBe(true);
  });

  it("cancels workflow timeouts", () => {
    const manager = new ExecutionTimeoutManager();

    manager.startTimeout(
      "wf-2",
      1000,
      () => {}
    );

    const result = manager.cancelTimeout("wf-2");

    expect(result).toBe(true);

    expect(
      manager.hasTimeout("wf-2")
    ).toBe(false);
  });
});