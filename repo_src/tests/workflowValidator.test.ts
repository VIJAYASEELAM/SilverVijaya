import { WorkflowValidator } from "../src/validators/WorkflowValidator";

describe("WorkflowValidator", () => {
  it("validates workflows successfully", () => {
    const validator = new WorkflowValidator();

    expect(() =>
      validator.validate({
        id: "wf-1",
        name: "Valid Workflow",
        active: true,
        steps: [
          {
            id: "step-1",
            action: "send-email"
          }
        ]
      })
    ).not.toThrow();
  });

  it("rejects workflows without steps", () => {
    const validator = new WorkflowValidator();

    expect(() =>
      validator.validate({
        id: "wf-2",
        name: "Invalid Workflow",
        active: true,
        steps: []
      })
    ).toThrow("Workflow must contain at least one step");
  });

  it("rejects duplicate step ids", () => {
    const validator = new WorkflowValidator();

    expect(() =>
      validator.validate({
        id: "wf-3",
        name: "Duplicate Steps",
        active: true,
        steps: [
          {
            id: "step-1",
            action: "send-email"
          },
          {
            id: "step-1",
            action: "notify-user"
          }
        ]
      })
    ).toThrow("Duplicate workflow step id");
  });
});