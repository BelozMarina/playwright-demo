import { BasePage } from '../basePage';

export type SortOption =
  | 'Name (A - Z)'
  | 'Name (Z - A)'
  | 'Price (High - Low)'
  | 'Price (Low - High)'
  | 'ldklsdf';

export class ProductsFiltersFragment extends BasePage {
  readonly root = this.page.getByTestId('filters');
  readonly sortDropdown = this.root.getByTestId('sort');

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
}
