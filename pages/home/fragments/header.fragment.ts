import { Locator } from '@playwright/test';
import { BasePage } from '../basePage';

export class HeaderFragment extends BasePage {
  readonly signIn: Locator = this.page.getByTestId('nav-sign-in');

  async selectSignInMenu(): Promise<void> {
    await this.signIn.click();
  }
}
