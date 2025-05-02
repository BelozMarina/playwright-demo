import { envConfig } from '../env.config';
import { AppPage } from '../pages/appPage';
import { test as baseTest } from '@playwright/test';

type MyFixtures = {
  app: AppPage;
  loggedApp: AppPage;
};

export const test = baseTest.extend<MyFixtures>({
  app: async ({ page }, use) => {
    const app = new AppPage(page);
    await use(app);
  },
  loggedApp: async ({ app }, use) => {
    await app.loginPage.goto();
    await app.loginPage.headerFragment.navigateSignInMenu();
    await app.loginPage.login(envConfig.USER_EMAIL, envConfig.USER_PASSWORD);
    await use(app);
  },
});
