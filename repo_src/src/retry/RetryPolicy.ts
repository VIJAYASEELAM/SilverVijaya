export class RetryPolicy {
  calculateDelay(attempt: number): number {
    if (attempt <= 0) {
      return 0;
    }

    return attempt * 1000;
  }

  shouldRetry(attempt: number, maxRetries: number): boolean {
    return attempt < maxRetries;
  }
}