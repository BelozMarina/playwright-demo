import { error } from 'console';
import { BasePage } from './basePage';
import {
  ProductsFiltersFragment,
  SortOption,
} from './fragments/products.filters.fragment';
import test, { expect, Locator, Page } from '@playwright/test';
import { HandTools, Other, PowerTools, Categories } from './enums/categoryEnum';

export class HomePage extends BasePage {
  readonly filtersFragment: ProductsFiltersFragment =
    new ProductsFiltersFragment(this.page);

  readonly productName: Locator = this.page.getByTestId('product-name');
  readonly productPrice: Locator = this.page.getByTestId('product-price');
  readonly filteredProducts: Locator =
    this.page.getByTestId('filter_completed');
  readonly skeleton: Locator = this.page.locator('div.skeleton');
  readonly pagination: Locator = this.page.locator(
    '.pagination a[aria-label^="Page"]'
  );

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

        await test.info().attach('Sorted products name A - Z on UI', {
          body: JSON.stringify(actualListProdName, null, 2),
          contentType: 'application/json',
        });

        await test
          .info()
          .attach('Sorted products name A - Z after calculation', {
            body: JSON.stringify(expectedListProdName, null, 2),
            contentType: 'application/json',
          });

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

        await test.info().attach('Sorted products name Z - A on UI', {
          body: JSON.stringify(actualListProdName, null, 2),
          contentType: 'application/json',
        });

        await test
          .info()
          .attach('Sorted products name Z - A after calculation', {
            body: JSON.stringify(expectedListProdName, null, 2),
            contentType: 'application/json',
          });

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

        await test.info().attach('Sorted products price Low - High on UI', {
          body: JSON.stringify(actualListProdPrice, null, 2),
          contentType: 'application/json',
        });

        await test
          .info()
          .attach('Sorted products price Low - High after calculation', {
            body: JSON.stringify(expectedListProdPrice, null, 2),
            contentType: 'application/json',
          });

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

        await test.info().attach('Sorted products price High - Low on UI', {
          body: JSON.stringify(actualListProdPrice, null, 2),
          contentType: 'application/json',
        });

        await test
          .info()
          .attach('Sorted products price High - Low after calculation', {
            body: JSON.stringify(expectedListProdPrice, null, 2),
            contentType: 'application/json',
          });

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

    await test.info().attach(`Filtered products by categories - ${category}`, {
      body: JSON.stringify(filteredProducts, null, 2),
      contentType: 'application/json',
    });

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
    const expectedResult = countPageFromResponse;

    expect(
      actualResult,
      'Count pages on home page are not equal count pages from API'
    ).toBe(expectedResult);
  }
}
