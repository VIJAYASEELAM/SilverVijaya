import { ExecutionHistoryStore } from "../src/state/ExecutionHistoryStore";

describe("ExecutionHistoryStore", () => {
  it("stores execution records", () => {
    const store = new ExecutionHistoryStore();

    store.addRecord({
      workflowId: "wf-1",
      status: "completed",
      timestamp: Date.now()
    });

    expect(
      store.getWorkflowHistory("wf-1")
    ).toHaveLength(1);
  });

  it("clears workflow history", () => {
    const store = new ExecutionHistoryStore();

    store.addRecord({
      workflowId: "wf-2",
      status: "failed",
      timestamp: Date.now()
    });

    store.clearWorkflowHistory("wf-2");

    expect(
      store.getWorkflowHistory("wf-2")
    ).toHaveLength(0);
  });

  it("returns all execution records", () => {
    const store = new ExecutionHistoryStore();

    store.addRecord({
      workflowId: "wf-3",
      status: "completed",
      timestamp: Date.now()
    });

    store.addRecord({
      workflowId: "wf-4",
      status: "running",
      timestamp: Date.now()
    });

    expect(
      store.getAllRecords()
    ).toHaveLength(2);
  });
});