export interface ExecutionRecord {
  workflowId: string;
  status: string;
  timestamp: number;
}

export class ExecutionHistoryStore {
  private records: ExecutionRecord[];

  constructor() {
    this.records = [];
  }

  addRecord(record: ExecutionRecord): void {
    this.records.push(record);
  }

  getWorkflowHistory(
    workflowId: string
  ): ExecutionRecord[] {
    return this.records.filter(
      (record) => record.workflowId === workflowId
    );
  }

  clearWorkflowHistory(workflowId: string): void {
    this.records = this.records.filter(
      (record) => record.workflowId !== workflowId
    );
  }

  getAllRecords(): ExecutionRecord[] {
    return [...this.records];
  }
}