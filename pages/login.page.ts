import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './home/fragments/header.fragment';

export class LoginPage {
  page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;
  headerFragment: HeaderFragment;

  constructor(page: Page) {
    this.page = page;
    this.headerFragment = new HeaderFragment(page);
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.submitButton = page.getByTestId('login-submit');
  }

  async login(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submitButton.click();
  }
}
