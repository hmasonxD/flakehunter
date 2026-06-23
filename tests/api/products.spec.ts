import { test, expect } from '@playwright/test';

// API 1: GET productsList — happy path
test('GET /api/productsList returns 200 and a non-empty product list', async ({ request }) => {
  const res = await request.get('/api/productsList');
  expect(res.status()).toBe(200);
  const body = JSON.parse(await res.text());
  expect(body.responseCode).toBe(200);
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);
  // each product has the fields we depend on
  expect(body.products[0]).toHaveProperty('id');
  expect(body.products[0]).toHaveProperty('name');
  expect(body.products[0]).toHaveProperty('price');
});

// API 2: POST to productsList — negative path, method not supported
test('POST /api/productsList is rejected as method not supported', async ({ request }) => {
  const res = await request.post('/api/productsList');
  const body = JSON.parse(await res.text());
  expect(body.responseCode).toBe(405);
  expect(body.message).toContain('not supported');
});