import { expect, Locator } from '@playwright/test';
import { PaymentMethod } from '../checkout';
import { BasePage } from '../../home/basePage';
import { ICreditCard } from '../../../typings/ICreditCard';

export class PaymentStep extends BasePage {
  readonly paymentMethodDropdown: Locator =
    this.page.getByTestId('payment-method');
  readonly confirmButton: Locator = this.page.getByTestId('finish');
  readonly creditCardNumber: Locator =
    this.page.getByTestId('credit_card_number');
  readonly creditCardCvv: Locator = this.page.getByTestId('cvv');
  readonly creditCardExpiryDate: Locator =
    this.page.getByTestId('expiration_date');
  readonly creditCardHolderName: Locator =
    this.page.getByTestId('card_holder_name');
  readonly paymentSuccessMessage: Locator = this.page.getByTestId(
    'payment-success-message'
  );

  async selectPaymentMethod(option: PaymentMethod): Promise<void> {
    await this.paymentMethodDropdown.selectOption({ label: option });
  }

  async fillInFormCreditCard(creditCard: ICreditCard): Promise<void> {
    await this.creditCardNumber.fill(creditCard.cardNumber);
    await this.creditCardExpiryDate.fill(creditCard.expiryDate);
    await this.creditCardCvv.fill(creditCard.cvv);
    await this.creditCardHolderName.fill(creditCard.cardHolder);
  }

  async submitPayment(): Promise<void> {
    await this.confirmButton.click();
  }

  async expectPaymentSuccessMessage(): Promise<void> {
    await expect
      .soft(this.paymentSuccessMessage)
      .toBeVisible({ timeout: 7_000 });
    await expect
      .soft(this.paymentSuccessMessage)
      .toHaveText('Payment was successful');
  }
}
