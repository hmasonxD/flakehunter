import { test, expect } from '@playwright/test';

test('home page loads and shows the product list', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Automation Exercise/);
  await expect(page.locator('.features_items')).toBeVisible();
});