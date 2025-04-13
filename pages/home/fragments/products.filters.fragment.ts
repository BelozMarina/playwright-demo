import { expect, Locator } from '@playwright/test';
import { BasePage } from '../basePage';
import { HandTools, Other, PowerTools } from '../enums/categoryEnum';

export type SortOption =
  | 'Name (A - Z)'
  | 'Name (Z - A)'
  | 'Price (High - Low)'
  | 'Price (Low - High)';

export class ProductsFiltersFragment extends BasePage {
  readonly root: Locator = this.page.getByTestId('filters');
  readonly sortDropdown: Locator = this.root.getByTestId('sort');
  readonly categories: Locator = this.root.locator('.checkbox');

  async selectSortOptions(option: SortOption): Promise<void> {
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/products?sort=') &&
        response.status() === 200 &&
        response.request().method() === 'GET'
    );

    await this.sortDropdown.selectOption(option);
    await responsePromise;
  }

  async selectCategory(categoryOption: HandTools | PowerTools | Other) {
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/products?between=price') &&
        response.status() === 200 &&
        response.request().method() === 'GET'
    );

    await this.categories.getByText(`${categoryOption}`).check();
    await this.page.waitForLoadState('networkidle', { timeout: 2000 });

    await responsePromise;
  }
}
