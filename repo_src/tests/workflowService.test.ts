import { WorkflowService } from "../src/api/WorkflowService";
import { InMemoryWorkflowStore } from "../src/state/InMemoryWorkflowStore";
import { WorkflowValidator } from "../src/validators/WorkflowValidator";

describe("WorkflowService", () => {
  it("registers workflows", () => {
    const service = new WorkflowService(
      new InMemoryWorkflowStore(),
      new WorkflowValidator()
    );

    service.register({
      id: "wf-1",
      name: "Registration Workflow",
      active: true,
      steps: [
        {
          id: "step-1",
          action: "send-email"
        }
      ]
    });

    expect(
      service.getWorkflow("wf-1")?.name
    ).toBe("Registration Workflow");
  });

  it("deletes workflows", () => {
    const service = new WorkflowService(
      new InMemoryWorkflowStore(),
      new WorkflowValidator()
    );

    service.register({
      id: "wf-2",
      name: "Temporary Workflow",
      active: true,
      steps: [
        {
          id: "step-1",
          action: "notify-user"
        }
      ]
    });

    const result =
      service.deleteWorkflow("wf-2");

    expect(result).toBe(true);

    expect(
      service.getWorkflow("wf-2")
    ).toBeUndefined();
  });

  it("lists workflows", () => {
    const service = new WorkflowService(
      new InMemoryWorkflowStore(),
      new WorkflowValidator()
    );

    service.register({
      id: "wf-3",
      name: "Workflow One",
      active: true,
      steps: [
        {
          id: "step-1",
          action: "step-one"
        }
      ]
    });

    service.register({
      id: "wf-4",
      name: "Workflow Two",
      active: true,
      steps: [
        {
          id: "step-2",
          action: "step-two"
        }
      ]
    });

    expect(
      service.listWorkflows()
    ).toHaveLength(2);
  });
});