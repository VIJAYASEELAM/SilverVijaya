import { WorkflowLifecycle } from "../src/workflows/WorkflowLifecycle";

describe("WorkflowLifecycle", () => {
  it("activates workflows", () => {
    const lifecycle = new WorkflowLifecycle();

    lifecycle.activate("wf-1");

    expect(
      lifecycle.getState("wf-1")
    ).toBe("active");
  });

  it("pauses workflows", () => {
    const lifecycle = new WorkflowLifecycle();

    lifecycle.pause("wf-2");

    expect(
      lifecycle.getState("wf-2")
    ).toBe("paused");
  });

  it("archives workflows", () => {
    const lifecycle = new WorkflowLifecycle();

    lifecycle.archive("wf-3");

    expect(
      lifecycle.getState("wf-3")
    ).toBe("archived");
  });
});