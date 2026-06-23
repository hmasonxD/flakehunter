import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { CheckoutFlow } from '../../pages/CheckoutFlow';
import { uniqueUser } from '../../utils/testData';

test.describe('End-to-end purchase journey', () => {
  test('a new shopper can register, add a product, and place an order', async ({ page }) => {
    const user = uniqueUser();
    const products = new ProductsPage(page);
    const flow = new CheckoutFlow(page);

    // 1. browse and add a product
    await products.goto();
    await products.addFirstProductToCart();
    await products.viewCartFromModal();

    // 2. proceed to checkout -> prompted to register
    await page.locator('.check_out').first().click();
    await page.getByRole('link', { name: 'Register / Login' }).click();

    // 3. register a fresh, unique account
    await flow.startSignup(user.name, user.email);
    await flow.completeRegistration(user);
    await flow.assertLoggedIn(user.name);

    // 4. place the order and pay
    await flow.placeOrderFromCart();
    await flow.pay(user.card);

    // 5. verify the order was placed
    await expect(page.locator('[data-qa="order-placed"]')).toBeVisible();

    // 6. clean up — delete the account so the test is repeatable
    await flow.deleteAccount();
  });
});