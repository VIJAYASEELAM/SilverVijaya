import { factorial, fibonacci } from '../src/utils/math';

describe('math utils', () => {
  test('factorial basic', () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(5)).toBe(120);
  });

  test('factorial negative throws', () => {
    expect(() => factorial(-1)).toThrow();
  });

  test('fibonacci values', () => {
    expect(fibonacci(0)).toBe(0);
    expect(fibonacci(1)).toBe(1);
    expect(fibonacci(7)).toBe(13);
  });
});
