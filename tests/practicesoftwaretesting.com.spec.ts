import { test, expect, Locator } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('/auth/login');
  await page.getByTestId('email').fill(process.env.USER_EMAIL!);
  await page.getByTestId('password').fill(process.env.USER_PASSWORD!);
  await page.getByTestId('login-submit').click();

  await expect(
    page,
    'URL mismatch! Expected: https://practicesoftwaretesting.com/account'
  ).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(
    page.getByTestId('page-title'),
    'Page title is incorrect! Expected: "My account"'
  ).toHaveText('My account');
  await expect(
    page.getByTestId('nav-menu'),
    'Username "Jane Doe" not found in the navigation bar'
  ).toHaveText(process.env.USER_NAME!);
});

test('Verify user can view product details', async ({ page }) => {
  await page.goto('/');
  await page.getByAltText('Combination Pliers').click();

  expect(page.url()).toContain('/product');
  await expect(page.getByTestId('product-name')).toContainText(
    'Combination Pliers'
  );
  await expect(page.getByTestId('unit-price')).toHaveText('14.15');
  await expect(page.getByTestId('add-to-cart')).toBeVisible();
  await expect(page.getByTestId('add-to-favorites')).toBeVisible();
});

test('Verify user can add product to cart', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });
  await page.getByAltText('Slip Joint Pliers').click();

  await expect(page.url()).toContain('/product');
  await expect(page.getByTestId('product-name')).toHaveText(
    'Slip Joint Pliers'
  );
  await expect(page.getByTestId('unit-price')).toHaveText('9.17');

  await page.getByTestId('add-to-cart').click();
  await expect(
    page.getByRole('alert', { name: 'Product added to shopping cart' })
  ).toBeVisible();
  await expect(
    page.getByRole('alert', { name: 'Product added to shopping cart' })
  ).toBeHidden({ timeout: 8_000 });
  await expect(page.getByTestId('cart-quantity')).toHaveText('1');

  await page.getByTestId('nav-cart').click();

  await expect(page).toHaveURL(/checkout/);
  await expect(page.locator('.table-hover thead')).toBeVisible();
  expect(await page.locator('.table tbody tr').count()).toBe(1);
  await expect(page.getByTestId('product-title')).toHaveText(
    'Slip Joint Pliers'
  );
  await expect(page.getByTestId('proceed-1')).toBeVisible();
});
