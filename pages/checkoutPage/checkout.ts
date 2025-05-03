import { expect, Locator } from '@playwright/test';
import { BasePage } from '../home/basePage';
import { BillingStep } from './components/billing.step.component';
import { PaymentStep } from './components/payment.step.component';
import { envConfig } from '../../env.config';

export type PaymentMethod =
  | 'Bank Transfer'
  | 'Credit Card'
  | 'Cash on Delivery'
  | 'Buy Now Pay Later'
  | 'Gift Card';

export class CheckoutPage extends BasePage {
  readonly billingStep: BillingStep = new BillingStep(this.page);
  readonly paymentStep: PaymentStep = new PaymentStep(this.page);

  readonly checkoutTitle: Locator = this.page.getByTestId('product-title');
  readonly productPrice: Locator = this.page.getByTestId('product-price');
  readonly cardTotalPrice: Locator = this.page.getByTestId('cart-total');
  readonly proceedToCheckoutButton: Locator = this.page.getByRole('button', {
    name: 'Proceed to checkout',
  });
  readonly pageMessage: Locator = this.page.locator('p.ng-star-inserted');

  async getCheckoutTitle(): Promise<string> {
    const title = (await this.checkoutTitle.textContent())?.trim();
    if (title) {
      return title;
    }
    throw new Error('Checkout title not found');
  }

  async getLinePrice(): Promise<string> {
    const price = await this.productPrice.textContent();
    const priceResult = price?.replace('$', '');
    if (priceResult) {
      return priceResult;
    }
    throw new Error('Line price not found');
  }

  async getCardTotalPrice(): Promise<string> {
    const price = await this.cardTotalPrice.textContent();
    const priceResult = price?.replace('$', '');
    if (priceResult) {
      return priceResult;
    }
    throw new Error('Card total price not found');
  }

  async expectCheckoutDetails(cardName: string, price: string): Promise<void> {
    await this.page.waitForURL(/checkout/);
    await this.checkoutTitle.waitFor();
    await this.checkoutTitle.isVisible();
    const title = await this.getCheckoutTitle();
    const linePrice = await this.getLinePrice();
    const cardTotalPrice = await this.getCardTotalPrice();

    expect
      .soft(title, `Product name mismatch! Expected: ${cardName}`)
      .toBe(cardName);

    expect
      .soft(linePrice, `Line price mismatch! Expected: ${price}`)
      .toBe(price);

    expect
      .soft(cardTotalPrice, `Card total price mismatch! Expected: ${price}`)
      .toBe(price);
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }

  async expectUserIsLoggedIn(): Promise<void> {
    await expect.soft(this.pageMessage).toBeVisible();
    await expect
      .soft(this.pageMessage)
      .toHaveText(
        `Hello ${envConfig.USER_NAME}, you are already logged in. You can proceed to checkout.`
      );
  }
}
