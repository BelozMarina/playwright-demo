import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(readonly page: Page) {
    this.page = page;
  }
  // constructor(protected page: Page) {}

  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path, { waitUntil: 'load' });
  }
}
