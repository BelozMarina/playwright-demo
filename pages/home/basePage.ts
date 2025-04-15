import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'load' });
    await this.page
      .locator(`[data-test^="product"]`)
      .first()
      .waitFor({ state: 'visible' });
  }
}
