import { Locator } from '@playwright/test';
import { baseFragment } from '../baseFragment';

export class HeaderFragment extends baseFragment {
  readonly signIn: Locator = this.page.getByTestId('nav-sign-in');
  readonly checkout: Locator = this.page.getByTestId('nav-cart');

  async selectSignInMenu(): Promise<void> {
    await this.signIn.click();
  }
  async selectCheckoutMenu(): Promise<void> {
    await this.checkout.click();
  }
}
