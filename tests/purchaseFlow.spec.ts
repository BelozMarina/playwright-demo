import { test } from '../fixtures';
import { ProductsName } from '../pages/home/enums/categoryEnum';
import { billingAddress } from '../testData/billingAddressData';
import { creditCardData } from '../testData/creditCardData';
test('E2E purchase flow: add to cart → checkout → payment (logged-in user)', async ({
  loggedApp,
}) => {
  await test.step('Navigate to home page', async () => {
    await loggedApp.homePage.goto();
  });

  await test.step(`Select product card ${ProductsName.COMBINATION_PLIERS}`, async () => {
    await loggedApp.homePage.selectCard(ProductsName.COMBINATION_PLIERS);
  });

  await test.step('Add product to cart', async () => {
    await loggedApp.productPage.addToCart();
  });

  const productName = await loggedApp.productPage.getNameCard();
  const productPrice = await loggedApp.productPage.getPriceCard();

  await test.step('Navigate to checkout page', async () => {
    await loggedApp.homePage.headerFragment.navigateCheckoutMenu();
  });

  await test.step('Verify checkout page', async () => {
    await loggedApp.checkoutPage.expectCheckoutDetails(
      productName,
      productPrice
    );
  });

  await test.step('Proceed to checkout', async () => {
    await loggedApp.checkoutPage.proceedToCheckout();
  });

  await test.step('Verify text on checkout page', async () => {
    await loggedApp.checkoutPage.expectUserIsLoggedIn();
  });

  await test.step('Proceed to billing step', async () => {
    await loggedApp.checkoutPage.proceedToCheckout();
  });

  await test.step('Fill in payment details', async () => {
    await loggedApp.checkoutPage.billingStep.fillInFormBillingAddress(
      billingAddress
    );
  });

  await test.step('Proceed to billing step', async () => {
    await loggedApp.checkoutPage.proceedToCheckout();
  });

  await test.step('Select payment method', async () => {
    await loggedApp.checkoutPage.paymentStep.selectPaymentMethod('Credit Card');
  });

  await test.step('Fill in credit card details', async () => {
    await loggedApp.checkoutPage.paymentStep.fillInFormCreditCard(
      creditCardData
    );
  });

  await test.step('Submit payment', async () => {
    await loggedApp.checkoutPage.paymentStep.submitPayment();
  });

  await test.step('Verify success message', async () => {
    await loggedApp.checkoutPage.paymentStep.expectPaymentSuccessMessage();
  });
});
