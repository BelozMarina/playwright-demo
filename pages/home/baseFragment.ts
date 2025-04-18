import { Page } from '@playwright/test';

export abstract class baseFragment {
  constructor(readonly page: Page) {}
}
