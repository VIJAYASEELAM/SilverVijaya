import request from 'supertest';
import app from '../src/api/server';

describe('API integration', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('GET /items returns list and filters', async () => {
    const res = await request(app).get('/items');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    const filter = await request(app).get('/items').query({ q: 'ban' });
    expect(filter.body.length).toBeGreaterThan(0);
  });

  test('POST /sum adds numbers', async () => {
    const res = await request(app).post('/sum').send({ a: 2, b: 3 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 5 });
  });
});
