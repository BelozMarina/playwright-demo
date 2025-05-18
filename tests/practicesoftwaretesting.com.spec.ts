import { test } from '../fixtures';
import { ProductsName } from '../pages/home/enums/categoryEnum';

//   await test.step('Navigate to home page', async () => {
//     await app.loginPage.goto();
//   });

//   await test.step('Navigate to auth form', async () => {
//     await app.loginPage.headerFragment.selectSignInMenu();
//   });

//   await test.step('Fill out the auth form', async () => {
//     await app.loginPage.login(envConfig.USER_EMAIL, envConfig.USER_PASSWORD);
//   });

//   await test.step('Verify successful login', async () => {
//     await app.loginPage.expectLogin();
//   });
// });

test('Verify login with valid credentials @T720ef0c8', async ({ loggedApp }) => {
  await test.step('Navigate to my account page', async () => {
    await loggedApp.homePage.goto('/account');
  });

  await test.step('Verify successful login', async () => {
    await loggedApp.loginPage.expectLogin();
  });
});

test('Verify user can view product details @T02e2a814', async ({ app }) => {
  await test.step('Navigate to home page', async () => {
    await app.homePage.goto();
  });

  await test.step(`Select product card ${ProductsName.COMBINATION_PLIERS}`, async () => {
    await app.homePage.selectCard(ProductsName.COMBINATION_PLIERS);
  });

  await test.step('Verify product details', async () => {
    await app.productPage.expectProductDetails(
      ProductsName.COMBINATION_PLIERS,
      '14.15'
    );
  });
});

test('Verify user can add product to cart @Ta63c211e', async ({ app }) => {
  await test.step('Navigate to home page', async () => {
    await app.homePage.goto();
  });

  await test.step(`Select product card ${ProductsName.SLIP_JOINT_PLIERS}`, async () => {
    await app.homePage.selectCard(ProductsName.SLIP_JOINT_PLIERS);
  });

  await test.step('Verify product details', async () => {
    await app.productPage.expectProductDetails(
      ProductsName.SLIP_JOINT_PLIERS,
      '9.17'
    );
  });

  await test.step('Add product to cart', async () => {
    await app.productPage.addToCart();
  });
  await test.step('Verify product added to cart', async () => {
    await app.productPage.expectProductAddedToCart();
  });

  await test.step('Navigate to cart', async () => {
    await app.homePage.headerFragment.navigateCheckoutMenu();
  });

  await test.step('Verify cart page', async () => {
    await app.checkoutPage.expectCheckoutPage();
  });
});
