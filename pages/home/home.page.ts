import { error } from 'console';
import { BasePage } from './basePage';
import {
  ProductsFiltersFragment,
  SortOption,
} from './fragments/products.filters.fragment';
import { expect, Locator, Page } from '@playwright/test';
import { HandTools, Other, PowerTools, Categories } from './enums/categoryEnum';

export class HomePage extends BasePage {
  readonly productName: Locator = this.page.getByTestId('product-name');
  readonly productPrice: Locator = this.page.getByTestId('product-price');
  readonly filteredProducts: Locator =
    this.page.getByTestId('filter_completed');
  readonly skeleton: Locator = this.page.locator('div.skeleton');
  readonly pagination: Locator = this.page.locator(
    '.pagination a[aria-label^="Page"]'
  );
  readonly filtersFragment: ProductsFiltersFragment =
    new ProductsFiltersFragment(this.page);

  async getListProductNames(): Promise<string[]> {
    const listProductNames = await this.productName.allTextContents();

    return listProductNames;
  }

  async getListProductPrices(): Promise<number[]> {
    const listProductPrices = await this.productPrice.allTextContents();

    return listProductPrices.map((price) =>
      parseInt(price.replace('$', '').trim())
    );
  }

  async expectSortedProducts(sortOption: SortOption): Promise<void> {
    switch (sortOption) {
      case 'Name (A - Z)': {
        const actualListProdName = await this.getListProductNames();
        expect.soft(actualListProdName.length).toBeGreaterThan(0);

        const expectedListProdName = actualListProdName.toSorted();
        expect(
          actualListProdName,
          `Products are sorted incorrectly from ${sortOption}`
        ).toEqual(expectedListProdName);
        break;
      }
      case 'Name (Z - A)': {
        const actualListProdName = await this.getListProductNames();
        expect.soft(actualListProdName.length).toBeGreaterThan(0);

        const expectedListProdName = actualListProdName.toSorted().reverse();
        expect(
          actualListProdName,
          `Products are sorted incorrectly from ${sortOption}`
        ).toEqual(expectedListProdName);
        break;
      }
      case 'Price (Low - High)': {
        const actualListProdPrice = await this.getListProductPrices();
        expect.soft(actualListProdPrice.length).toBeGreaterThan(0);

        const expectedListProdPrice = actualListProdPrice.toSorted();
        expect(
          actualListProdPrice,
          `Products are sorted incorrectly from ${sortOption}`
        ).toEqual(expectedListProdPrice);
        break;
      }
      case 'Price (High - Low)': {
        const actualListProdPrice = await this.getListProductPrices();
        expect.soft(actualListProdPrice.length).toBeGreaterThan(0);

        const expectedListProdPrice = actualListProdPrice.toSorted().reverse();
        expect(
          actualListProdPrice,
          `Products are sorted incorrectly from ${sortOption}`
        ).toEqual(expectedListProdPrice);
        break;
      }
      default:
        throw error(error);
    }
  }

  async getFilteredProducts(): Promise<string[]> {
    const filteredProd = await this.filteredProducts.allTextContents();

    return filteredProd;
  }

  async expectFilteredCategoryBySelectedName(
    category: Categories | HandTools | PowerTools | Other
  ): Promise<void> {
    const filteredProducts = await this.getFilteredProducts();

    expect.soft(filteredProducts.length, 'Array is empty').toBeGreaterThan(0);

    filteredProducts.forEach((item) => {
      expect(
        item,
        `Products are filtered incorrectly by ${category}`
      ).toContain(category);
    });
  }

  async getCountPages(): Promise<number> {
    const ariaLabel = this.pagination;

    return await ariaLabel.count();
  }

  async expectCountPagesBySelectedCategories(
    countPageFromResponse: number
  ): Promise<void> {
    const actualResult = await this.getCountPages();

    console.log('actualResult count pages', actualResult);

    const expectedResult = countPageFromResponse;

    console.log('expectedResult from api', expectedResult);

    expect(actualResult).toBe(expectedResult);
  }
}
