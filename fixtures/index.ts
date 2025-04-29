import { envConfig } from '../env.config';
import { App } from '../pages/appPage';
import { test as baseTest } from '@playwright/test';

type MyFixtures = {
  app: App;
  loggedApp: App;
};

export const test = baseTest.extend<MyFixtures>({
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },
  loggedApp: async ({ app }, use) => {
    await app.loginPage.goto();
    await app.loginPage.headerFragment.selectSignInMenu();
    await app.loginPage.login(envConfig.USER_EMAIL, envConfig.USER_PASSWORD);
    await use(app);
  },
});
