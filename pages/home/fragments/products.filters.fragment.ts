import { expect, Locator } from '@playwright/test';
import {
  Categories,
  HandTools,
  Other,
  PowerTools,
} from '../enums/categoryEnum';
import { baseFragment } from '../baseFragment';

export type SortOption =
  | 'Name (A - Z)'
  | 'Name (Z - A)'
  | 'Price (High - Low)'
  | 'Price (Low - High)';

export type CategoriesOption = Categories | HandTools | PowerTools | Other;

export class ProductsFiltersFragment extends baseFragment {
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

    await this.sortDropdown.selectOption({ label: option });
    await responsePromise;
  }

  async waitForProductsVisible(): Promise<void> {
    await this.page
      .locator(`[data-test^="product"]`)
      .first()
      .waitFor({ state: 'visible' });
  }

  async selectSubCategory(categoryOption: CategoriesOption): Promise<void> {
    await this.waitForProductsVisible();
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/products?between=price') &&
        response.status() === 200 &&
        response.request().method() === 'GET'
    );

    await this.categories.getByText(categoryOption).check();

    await responsePromise;
  }

  async selectCustomCategories(categoryOption: Categories): Promise<void> {
    await this.waitForProductsVisible();
    await this.categories.getByText(categoryOption).check({ force: true });
  }

  async getCountPagesFromResponse(): Promise<number> {
    let count = 0;
    const responsePromise = this.page.waitForResponse((response) => {
      if (
        response.url().includes('/products?between=price') &&
        response.status() === 200 &&
        response.request().method() === 'GET'
      ) {
        count++;
        return count === 2;
      }
      return false;
    });

    const response = await responsePromise;
    const result = await response.json();

    return parseInt(result.last_page);
  }
}
