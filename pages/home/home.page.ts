import { BasePage } from './basePage';
import {
  ProductsFiltersFragment,
  SortOption,
} from './fragments/products.filters.fragment';
import test, { expect, Locator } from '@playwright/test';
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

  async expectSortedProductsByName(sortOption: SortOption): Promise<void> {
    const actualListProdName = await this.getListProductNames();
    expect.soft(actualListProdName.length).toBeGreaterThan(0);
    let expectedListProdName = actualListProdName.toSorted();

    if (sortOption === 'Name (Z - A)') {
      expectedListProdName = expectedListProdName.toSorted().reverse();
    }
    await test.info().attach('Sorted products name after calculation', {
      body: JSON.stringify(expectedListProdName, null, 2),
      contentType: 'application/json',
    });

    expect(
      actualListProdName,
      `Products are sorted incorrectly from ${sortOption}`
    ).toEqual(expectedListProdName);
  }

  async expectSortedProductsByPrice(sortOption: SortOption): Promise<void> {
    const actualListProdPrice = await this.getListProductPrices();
    expect.soft(actualListProdPrice.length).toBeGreaterThan(0);

    let expectedListProdPrice = actualListProdPrice.toSorted();

    if (sortOption === 'Price (High - Low)') {
      expectedListProdPrice = expectedListProdPrice.toSorted().reverse();
    }
    await test.info().attach('Sorted products name after calculation', {
      body: JSON.stringify(expectedListProdPrice, null, 2),
      contentType: 'application/json',
    });

    expect(
      actualListProdPrice,
      `Products are sorted incorrectly from ${sortOption}`
    ).toEqual(expectedListProdPrice);
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
