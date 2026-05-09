export interface ExecutionConfig {
  timeoutMs: number;
  maxRetries: number;
  retryDelayMs: number;
}

export const defaultExecutionConfig: ExecutionConfig = {
  timeoutMs: 5000,
  maxRetries: 3,
  retryDelayMs: 1000
};