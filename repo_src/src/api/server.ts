import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const items = [
  { id: '1', name: 'apple' },
  { id: '2', name: 'banana' },
  { id: '3', name: 'carrot' },
];

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/items', (req, res) => {
  const q = (req.query.q as string | undefined) || '';
  if (!q) return res.json(items);
  const filtered = items.filter((it) => it.name.includes(q));
  res.json(filtered);
});

app.post('/sum', (req, res) => {
  const { a, b } = req.body as { a?: number; b?: number };
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'a and b must be numbers' });
  }
  return res.json({ result: a + b });
});

export default app;
