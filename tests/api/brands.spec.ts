import { test, expect } from '@playwright/test';

test('GET /api/brandsList returns 200 and a non-empty brand list', async ({ request }) => {
  const res = await request.get('/api/brandsList');
  expect(res.status()).toBe(200);
  const body = JSON.parse(await res.text());
  expect(body.responseCode).toBe(200);
  expect(Array.isArray(body.brands)).toBe(true);
  expect(body.brands.length).toBeGreaterThan(0);
  expect(body.brands[0]).toHaveProperty('brand');
});

test('PUT /api/brandsList is rejected as method not supported', async ({ request }) => {
  const res = await request.put('/api/brandsList');
  const body = JSON.parse(await res.text());
  expect(body.responseCode).toBe(405);
  expect(body.message).toContain('not supported');
});