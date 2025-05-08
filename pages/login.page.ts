import { expect, Locator } from '@playwright/test';
import { HeaderFragment } from './home/fragments/header.fragment';
import { BasePage } from './home/basePage';
import { envConfig } from '../env.config';

export class LoginPage extends BasePage {
  headerFragment = new HeaderFragment(this.page);

  readonly email: Locator = this.page.getByTestId('email');
  readonly password: Locator = this.page.getByTestId('password');
  readonly submitButton: Locator = this.page.getByTestId('login-submit');
  readonly pageTitle = this.page.getByTestId('page-title');
  readonly navMenu = this.page.getByTestId('nav-menu');

  async login(email: string, password: string): Promise<void> {
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('users/me') &&
        response.status() === 200 &&
        response.request().method() === 'GET'
    );
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submitButton.click();

    await responsePromise;
  }

  async expectLogin(): Promise<void> {
    await expect(this.page, `Expected: ${envConfig.WEB_URL}/account`).toHaveURL(
      `${envConfig.WEB_URL}/account`
    );
    await expect(
      this.pageTitle,
      'Page title is incorrect! Expected: "My account"'
    ).toHaveText('My account');
    await expect(
      this.navMenu,
      'Username "Jane Doe" not found in the navigation bar'
    ).toHaveText(envConfig.USER_NAME);
  }
}
