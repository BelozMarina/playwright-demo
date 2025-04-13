import { error } from 'console';
import { BasePage } from './basePage';
import {
  ProductsFiltersFragment,
  SortOption,
} from './fragments/products.filters.fragment';
import { expect, Locator, Page } from '@playwright/test';

export class HomePage extends BasePage {
  readonly productName = this.page.getByTestId('product-name');
  readonly productPrice = this.page.getByTestId('product-price');
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
        const expectedListProdName = actualListProdName.toSorted();
        expect(
          actualListProdName,
          `Products are sorted incorrectly from ${sortOption}`
        ).toEqual(expectedListProdName);
        break;
      }
      case 'Name (Z - A)': {
        const actualListProdName = await this.getListProductNames();
        const expectedListProdName = actualListProdName.toSorted().reverse();
        expect(
          actualListProdName,
          `Products are sorted incorrectly from ${sortOption}`
        ).toEqual(expectedListProdName);
        break;
      }
      case 'Price (Low - High)': {
        const actualListProdPrice = await this.getListProductPrices();
        const expectedListProdPrice = actualListProdPrice.toSorted();
        expect(
          actualListProdPrice,
          `Products are sorted incorrectly from ${sortOption}`
        ).toEqual(expectedListProdPrice);
        break;
      }
      case 'Price (High - Low)': {
        const actualListProdPrice = await this.getListProductPrices();
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
}
