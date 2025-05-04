import { test as setup } from '../fixtures';
import { envConfig } from '../env.config';
import path from 'path';
const userAuthFile = path.join(
  process.cwd(),
  'playwright',
  '.auth',
  'user.json'
);

setup('Verify login with valid credentials', async ({ app }) => {
  await setup.step('Navigate to home page', async () => {
    await app.homePage.goto();
  });

  await setup.step('Navigate to auth form', async () => {
    await app.loginPage.headerFragment.navigateToLoginPage();
  });

  await setup.step('Fill out the auth form', async () => {
    await app.loginPage.login(envConfig.USER_EMAIL, envConfig.USER_PASSWORD);
  });

  await setup.step('Verify successful login', async () => {
    await app.loginPage.expectLogin();
  });

  await app.page.context().storageState({ path: userAuthFile });
});
