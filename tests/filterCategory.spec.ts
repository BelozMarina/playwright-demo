import { Categories, PowerTools } from '../pages/home/enums/categoryEnum';
import { test } from '../fixtures';

test(
  'Verify user can filter products by category @Ta97cca06',
  { tag: '@regression' },
  async ({ app }) => {
    await test.step('Navigate to home page', async () => {
      await app.homePage.goto();
    });

    await test.step(`Select option sorting by ${PowerTools.SANDER}`, async () => {
      await app.homePage.filtersFragment.selectSubCategory(PowerTools.SANDER);
    });

    await test.step(`Verify products are filtered by ${PowerTools.SANDER}`, async () => {
      await app.homePage.expectFilteredCategoryBySelectedName(
        PowerTools.SANDER
      );
    });
  }
);

[
  [Categories.OTHER, Categories.POWER_TOOLS],
  [Categories.OTHER, Categories.HAND_TOOLS],
].forEach((categories) => {
  test(
    `Verify user can filter products by several categories - ${categories.join(
      ' and '
    )} and all sub-categories @T585f2a3a`,
    { tag: '@regression' },
    async ({ app }) => {
      let countPage = 0;

      await test.step('Navigate to home page', async () => {
        await app.homePage.goto();
      });

      await test.step(`Select option sorting by Categories`, async () => {
        countPage = await app.homePage.filtersFragment.selectCustomCategories(
          categories
        );
      });

      await test.step(`Verify products are filtered by several category`, async () => {
        await app.homePage.expectCountPagesBySelectedCategories(countPage);
      });
    }
  );
});
