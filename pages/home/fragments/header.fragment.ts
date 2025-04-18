import { Locator } from '@playwright/test';
import { baseFragment } from '../baseFragment';

export class HeaderFragment extends baseFragment {
  readonly signIn: Locator = this.page.getByTestId('nav-sign-in');

  async selectSignInMenu(): Promise<void> {
    await this.signIn.click();
  }
}
