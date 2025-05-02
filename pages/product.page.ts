import { expect, Locator } from '@playwright/test';
import { BasePage } from './home/basePage';

export class ProductPage extends BasePage {
  readonly productName: Locator = this.page.getByTestId('product-name');
  readonly unitPrice: Locator = this.page.getByTestId('unit-price');
  readonly addToCartButton: Locator = this.page.getByTestId('add-to-cart');
  readonly addToFavorites: Locator = this.page.getByTestId('add-to-favorites');

  async expectProductDetails(
    productName: string,
    price: string
  ): Promise<void> {
    expect(this.page.url()).toContain('/product');
    await expect(this.productName).toContainText(productName);
    await expect(this.unitPrice).toHaveText(price);
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToFavorites).toBeVisible();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async getNameCard(): Promise<string> {
    const name = await this.productName.textContent();
    if (name) {
      return name;
    }
    throw new Error('Product name not found');
  }

  async getPriceCard(): Promise<string> {
    const price = await this.unitPrice.textContent();
    if (price) {
      return price;
    }
    throw new Error('Product price not found');
  }
}
