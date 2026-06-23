import { test, expect } from '@playwright/test';

/**
 * Investigation: does verifyLogin signal failures via the HTTP status code,
 * or only in the response body? Documented behaviour says invalid creds ->
 * 404 "User not found!". We verify what the live API actually returns.
 */
test('verifyLogin with invalid credentials — observe HTTP status vs body code', async ({ request }) => {
  const res = await request.post('/api/verifyLogin', {
    form: { email: 'definitely-not-a-real-user@nowhere.test', password: 'wrongpass123' },
  });

  const httpStatus = res.status();
  const body = JSON.parse(await res.text());

  // Log what actually came back, so the behaviour is documented in the run output.
  console.log(`HTTP status: ${httpStatus} | body.responseCode: ${body.responseCode} | message: ${body.message}`);

  // The body should report the logical failure code per the docs.
  expect(body.responseCode).toBe(404);
  expect(body.message).toContain('User not found');
});

test('verifyLogin missing the email parameter — observe status handling', async ({ request }) => {
  const res = await request.post('/api/verifyLogin', {
    form: { password: 'wrongpass123' },
  });

  const httpStatus = res.status();
  const body = JSON.parse(await res.text());
  console.log(`HTTP status: ${httpStatus} | body.responseCode: ${body.responseCode} | message: ${body.message}`);

  expect(body.responseCode).toBe(400);
  expect(body.message).toContain('missing');
});

/**
 * Known defect (see issue): verifyLogin returns HTTP 200 for a failed login
 * instead of a 4xx. This test asserts the CORRECT behaviour and is marked as a
 * known failure, so the suite tracks the bug and will flag if it ever gets fixed.
 */
test('verifyLogin should return a 4xx HTTP status for invalid credentials', async ({ request }) => {
  test.fail(); // documented defect: API returns 200 instead of a 4xx
  const res = await request.post('/api/verifyLogin', {
    form: { email: 'definitely-not-a-real-user@nowhere.test', password: 'wrongpass123' },
  });
  expect(res.status()).toBeGreaterThanOrEqual(400);
});