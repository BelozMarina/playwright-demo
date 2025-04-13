import test from '@playwright/test';
import { HomePage } from '../pages/home/home.page';
import { PowerTools } from '../pages/home/enums/categoryEnum';

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
