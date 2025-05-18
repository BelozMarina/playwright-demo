import test from '@playwright/test';
import { HomePage } from '../pages/home/home.page';
import {
  sortOptionNameData,
  sortOptionPriceData,
} from '../testData/sortOptionData';
import { SortOption } from '../pages/home/fragments/products.filters.fragment';

sortOptionNameData.forEach((sortOpt) => {
  test(`Verify user can perform sorting products by ${sortOpt} @Tf7883a58`, async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await test.step('Navigate to home page', async () => {
      await homePage.goto();
    });

    await test.step(`Select option sorting by ${sortOpt}`, async () => {
      await homePage.filtersFragment.selectSortOptions(sortOpt as SortOption);
    });

    await test.step(`Verify products are sorted by ${sortOpt}`, async () => {
      await homePage.expectSortedProductsByName(sortOpt as SortOption);
    });
  });
});

sortOptionPriceData.forEach((option) => {
  test(`Verify user can perform sorting products by ${option} @T8359a3a0`, async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await test.step('Navigate to home page', async () => {
      await homePage.goto();
    });

    await test.step(`Select option sorting by ${option}`, async () => {
      await homePage.filtersFragment.selectSortOptions(option as SortOption);
    });

    await test.step(`Verify products are sorted by ${option}`, async () => {
      await homePage.expectSortedProductsByPrice(option as SortOption);
    });
  });
});
