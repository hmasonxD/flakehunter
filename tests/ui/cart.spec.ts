import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart', () => {
  test('adding a product from the list puts it in the cart', async ({ page }) => {
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await products.goto();
    await products.addFirstProductToCart();
    await products.viewCartFromModal();

    await expect(cart.cartRows.first()).toBeVisible();
    expect(await cart.itemCount()).toBeGreaterThan(0);
  });
});