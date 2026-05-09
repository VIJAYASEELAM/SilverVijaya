import { runCli } from '../src/cli';

describe('cli', () => {
  test('health command returns 0', async () => {
    const code = await runCli(['node', 'cli', 'health']);
    expect(code).toBe(0);
  });

  test('unknown command returns non-zero', async () => {
    const code = await runCli(['node', 'cli', 'unknown-cmd']);
    expect(code).toBe(2);
  });
});
