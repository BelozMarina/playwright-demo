import test from '@playwright/test';
import { HomePage } from '../pages/home/home.page';
import { Categories, PowerTools } from '../pages/home/enums/categoryEnum';
import { categories } from '../testData/categoriesData';

test('Verify user can filter products by category', async ({ page }) => {
  const homePage = new HomePage(page);

  await test.step('Navigate to home page', async () => {
    await homePage.goto();
  });

  await test.step(`Select option sorting by ${PowerTools.SANDER}`, async () => {
    await homePage.filtersFragment.selectCategory(PowerTools.SANDER);
  });

  await test.step(`Verify products are filtered by ${PowerTools.SANDER}`, async () => {
    await homePage.expectFilteredCategoryBySelectedName(PowerTools.SANDER);
  });
});

test('Verify user can filter products by several categories and all sub-categories', async ({
  page,
}) => {
  const homePage = new HomePage(page);
  let countPage = 0;

  await test.step('Navigate to home page', async () => {
    await homePage.goto();
  });

  await test.step(`Select option sorting by Categories`, async () => {
    categories.forEach(({ category }) => {
      homePage.filtersFragment.selectCustomCategories(category);
    });
  });

  await test.step(`Get count pages from response`, async () => {
    countPage = await homePage.filtersFragment.getCountPagesFromResponse();
  });

  await test.step(`Verify products are filtered by several category`, async () => {
    await homePage.expectCountPagesBySelectedCategories(countPage);
  });
});
