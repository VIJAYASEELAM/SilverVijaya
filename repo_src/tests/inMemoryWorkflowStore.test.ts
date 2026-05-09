import { InMemoryWorkflowStore } from "../src/state/InMemoryWorkflowStore";

describe("InMemoryWorkflowStore", () => {
  it("stores workflows", () => {
    const store = new InMemoryWorkflowStore();

    store.save({
      id: "wf-1",
      name: "Stored Workflow",
      active: true,
      steps: []
    });

    expect(
      store.get("wf-1")?.name
    ).toBe("Stored Workflow");
  });

  it("deletes workflows", () => {
    const store = new InMemoryWorkflowStore();

    store.save({
      id: "wf-2",
      name: "Temporary Workflow",
      active: true,
      steps: []
    });

    expect(
      store.delete("wf-2")
    ).toBe(true);

    expect(
      store.get("wf-2")
    ).toBeUndefined();
  });
});