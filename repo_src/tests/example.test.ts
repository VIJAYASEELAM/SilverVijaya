import { add, isEven } from '../src/example';

describe('example utilities', () => {
  test('add adds two numbers', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 5)).toBe(4);
  });

  test('isEven returns true for even numbers', () => {
    expect(isEven(2)).toBe(true);
    expect(isEven(3)).toBe(false);
  });
});
