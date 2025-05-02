import { expect, Locator } from '@playwright/test';
import { PaymentMethod } from '../checkout';
import { ICreditCard } from '../../../typings/ICreditCard';
import { BasePage } from '../../home/basePage';

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

  async fillInFormCreditCard(creditCard: ICreditCard) {
    await this.creditCardNumber.fill(creditCard.cardNumber);
    await this.creditCardExpiryDate.fill(creditCard.expiryDate);
    await this.creditCardCvv.fill(creditCard.cvv);
    await this.creditCardHolderName.fill(creditCard.cardHolderName);
  }

  async submitPayment(): Promise<void> {
    await this.confirmButton.click();
  }

  async expectPaymentSuccessMessage(): Promise<void> {
    await expect(this.paymentSuccessMessage).toBeVisible();
    const message = await this.paymentSuccessMessage.textContent();
    if (message) {
      expect(message).toBe('Payment was successful!');
    }
    throw new Error('Payment success message not found');
  }
}
