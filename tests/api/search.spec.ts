import { test, expect } from '@playwright/test';

// POST searchProduct — happy path with a valid search term
test('POST /api/searchProduct returns matching products for a valid term', async ({ request }) => {
  const res = await request.post('/api/searchProduct', {
    form: { search_product: 'tshirt' },
  });
  expect(res.status()).toBe(200);
  const body = JSON.parse(await res.text());
  expect(body.responseCode).toBe(200);
  expect(Array.isArray(body.products)).toBe(true);
});

// POST searchProduct — negative path, required parameter missing
test('POST /api/searchProduct without the search parameter returns a 400', async ({ request }) => {
  const res = await request.post('/api/searchProduct');
  const body = JSON.parse(await res.text());
  expect(body.responseCode).toBe(400);
  expect(body.message).toContain('search_product parameter is missing');
});