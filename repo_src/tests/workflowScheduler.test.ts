import { WorkflowScheduler } from "../src/scheduler/WorkflowScheduler";

describe("WorkflowScheduler", () => {
  it("schedules workflows", () => {
    const scheduler = new WorkflowScheduler();

    scheduler.schedule(
      {
        id: "wf-1",
        name: "Scheduled Flow",
        active: true,
        steps: []
      },
      1000,
      () => {}
    );

    expect(
      scheduler.isScheduled("wf-1")
    ).toBe(true);
  });

  it("cancels scheduled workflows", () => {
    const scheduler = new WorkflowScheduler();

    scheduler.schedule(
      {
        id: "wf-2",
        name: "Cancelable Flow",
        active: true,
        steps: []
      },
      1000,
      () => {}
    );

    const result = scheduler.cancel("wf-2");

    expect(result).toBe(true);

    expect(
      scheduler.isScheduled("wf-2")
    ).toBe(false);
  });
});
