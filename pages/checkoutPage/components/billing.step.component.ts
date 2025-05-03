import { Locator } from '@playwright/test';
import { IBillingAddress } from '../../../typings/IBillingAddress';
import { BasePage } from '../../home/basePage';

export class BillingStep extends BasePage {
  readonly billingStreet: Locator = this.page.getByTestId('street');
  readonly billingCity: Locator = this.page.getByTestId('city');
  readonly billingState: Locator = this.page.getByTestId('state');
  readonly billingCountry: Locator = this.page.getByTestId('country');
  readonly billingPostcode: Locator = this.page.getByTestId('postal_code');

  async fillInFormBillingAddress(
    billingAddress: IBillingAddress
  ): Promise<void> {
    await this.billingStreet.fill(billingAddress.street);
    await this.billingCity.fill(billingAddress.city);
    await this.billingState.fill(billingAddress.state);
    await this.billingCountry.fill(billingAddress.country);
    await this.billingPostcode.fill(billingAddress.postcode);
  }
}
