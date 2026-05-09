export function factorial(n: number): number {
  if (n < 0) throw new Error('n must be >= 0');
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

export function fibonacci(n: number): number {
  if (n < 0) throw new Error('n must be >= 0');
  if (n === 0) return 0;
  if (n === 1) return 1;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}
