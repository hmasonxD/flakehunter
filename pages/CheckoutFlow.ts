import { Page, Locator, expect } from '@playwright/test';

/** Encapsulates the registration + checkout + payment journey. */
export class CheckoutFlow {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async startSignup(name: string, email: string) {
    await this.page.goto('/login');
    await this.page.locator('input[data-qa="signup-name"]').fill(name);
    await this.page.locator('input[data-qa="signup-email"]').fill(email);
    await this.page.locator('button[data-qa="signup-button"]').click();
  }

  async completeRegistration(user: ReturnType<typeof import('../utils/testData').uniqueUser>) {
    // account info form
    await this.page.locator('#id_gender1').check();
    await this.page.locator('input[data-qa="password"]').fill(user.password);
    await this.page.locator('select[data-qa="days"]').selectOption('10');
    await this.page.locator('select[data-qa="months"]').selectOption('5');
    await this.page.locator('select[data-qa="years"]').selectOption('1995');
    await this.page.locator('input[data-qa="first_name"]').fill(user.firstName);
    await this.page.locator('input[data-qa="last_name"]').fill(user.lastName);
    await this.page.locator('input[data-qa="address"]').fill(user.address);
    await this.page.locator('select[data-qa="country"]').selectOption(user.country);
    await this.page.locator('input[data-qa="state"]').fill(user.state);
    await this.page.locator('input[data-qa="city"]').fill(user.city);
    await this.page.locator('input[data-qa="zipcode"]').fill(user.zipcode);
    await this.page.locator('input[data-qa="mobile_number"]').fill(user.mobile);
    await this.page.locator('button[data-qa="create-account"]').click();

    await expect(this.page.locator('[data-qa="account-created"]')).toBeVisible();
    await this.page.locator('[data-qa="continue-button"]').click();
  }

  async assertLoggedIn(name: string) {
    await expect(this.page.locator('a', { hasText: `Logged in as ${name}` })).toBeVisible();
  }

  async placeOrderFromCart() {
    await this.page.goto('/view_cart');
    await this.page.locator('.check_out').first().click();
    // checkout page -> place order
    await this.page.locator('a[href="/payment"]').click();
  }

  async pay(card: ReturnType<typeof import('../utils/testData').uniqueUser>['card']) {
    await this.page.locator('input[data-qa="name-on-card"]').fill(card.name);
    await this.page.locator('input[data-qa="card-number"]').fill(card.number);
    await this.page.locator('input[data-qa="cvc"]').fill(card.cvc);
    await this.page.locator('input[data-qa="expiry-month"]').fill(card.expiryMonth);
    await this.page.locator('input[data-qa="expiry-year"]').fill(card.expiryYear);
    await this.page.locator('button[data-qa="pay-button"]').click();
  }

  async deleteAccount() {
    await this.page.locator('a[href="/delete_account"]').click();
    await expect(this.page.locator('[data-qa="account-deleted"]')).toBeVisible();
    await this.page.locator('[data-qa="continue-button"]').click();
  }
}