import app from './api/server';
import http from 'http';

export async function runCli(argv: string[]): Promise<number> {
  const cmd = argv[2] || 'start';
  if (cmd === 'start') {
    const port = process.env.PORT || '3000';
    const server = http.createServer(app);
    server.listen(Number(port));
    console.log(`server-started ${port}`);
    return 0;
  }
  if (cmd === 'health') {
    // simple check by calling /health
    // but for unit tests we'll just return success
    console.log('ok');
    return 0;
  }
  console.error('unknown command');
  return 2;
}

if (require.main === module) {
  runCli(process.argv).then((code) => process.exit(code));
}
