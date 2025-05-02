import { Locator } from '@playwright/test';
import { baseFragment } from '../baseFragment';

export class HeaderFragment extends baseFragment {
  readonly signIn: Locator = this.page.getByTestId('nav-sign-in');
  readonly checkout: Locator = this.page.getByTestId('nav-cart');
  readonly home: Locator = this.page.getByTestId('nav-home');

  async navigateSignInMenu(): Promise<void> {
    await this.signIn.click();
  }
  async navigateCheckoutMenu(): Promise<void> {
    await this.checkout.click();
  }
  async navigateHomeMenu(): Promise<void> {
    await this.home.click();
  }
}
