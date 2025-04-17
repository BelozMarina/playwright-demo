import test from '@playwright/test';
import { HomePage } from '../pages/home/home.page';
import {
  sortOptionNameData,
  sortOptionPriceData,
} from '../testData/sortOptionData';

sortOptionNameData.forEach(({ sortOpt }) => {
  test(`Verify user can perform sorting products by ${sortOpt}`, async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await test.step('Navigate to home page', async () => {
      await homePage.goto();
    });

    await test.step(`Select option sorting by ${sortOpt}`, async () => {
      await homePage.filtersFragment.selectSortOptions(sortOpt);
    });

    await test.step(`Verify products are sorted by ${sortOpt}`, async () => {
      await homePage.expectSortedProductsByName(sortOpt);
    });
  });
});

sortOptionPriceData.forEach(({ sortOpt }) => {
  test(`Verify user can perform sorting products by ${sortOpt}`, async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await test.step('Navigate to home page', async () => {
      await homePage.goto();
    });

    await test.step(`Select option sorting by ${sortOpt}`, async () => {
      await homePage.filtersFragment.selectSortOptions(sortOpt);
    });

    await test.step(`Verify products are sorted by ${sortOpt}`, async () => {
      await homePage.expectSortedProductsByPrice(sortOpt);
    });
  });
});
