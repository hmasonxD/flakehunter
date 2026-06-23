import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Product search', () => {
  test('searching for a term shows matching results', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.goto();
    await products.search('tshirt');

    await expect(products.searchedProductsTitle).toHaveText(/Searched Products/i);
    expect(await products.productCount()).toBeGreaterThan(0);
  });

  test('product list is populated on the products page', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.goto();
    expect(await products.productCount()).toBeGreaterThan(0);
  });
});