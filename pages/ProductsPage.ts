import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productList: Locator;
  readonly searchedProductsTitle: Locator;
  readonly cartModal: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productList = page.locator('.features_items .product-image-wrapper');
    this.searchedProductsTitle = page.locator('.title.text-center');
    this.cartModal = page.locator('#cartModal');
    this.viewCartLink = page.locator('#cartModal a[href="/view_cart"]');
  }

  async goto() {
    await this.page.goto('/products');
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async productCount(): Promise<number> {
    return this.productList.count();
  }

  async addFirstProductToCart() {
    const first = this.productList.first();
    await first.hover();
    await first.locator('.product-overlay .add-to-cart').first().click();
    // wait for the confirmation modal — this is what proves the add registered
    await this.cartModal.waitFor({ state: 'visible' });
  }

  async viewCartFromModal() {
    await this.viewCartLink.click();
  }
}