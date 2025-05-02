import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(readonly page: Page) {
    this.page = page;
  }
  // constructor(protected page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'load' });
  }
}
