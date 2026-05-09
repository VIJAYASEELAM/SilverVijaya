import { ExecutionQueue } from "../src/queues/ExecutionQueue";

describe("ExecutionQueue", () => {
  it("enqueues items", () => {
    const queue = new ExecutionQueue<string>();

    queue.enqueue("workflow-1");

    expect(queue.size()).toBe(1);
  });

  it("dequeues items in FIFO order", () => {
    const queue = new ExecutionQueue<string>();

    queue.enqueue("workflow-1");
    queue.enqueue("workflow-2");

    expect(queue.dequeue()).toBe("workflow-1");
    expect(queue.dequeue()).toBe("workflow-2");
  });

  it("returns undefined for empty queue", () => {
    const queue = new ExecutionQueue<string>();

    expect(queue.dequeue()).toBeUndefined();
  });
});