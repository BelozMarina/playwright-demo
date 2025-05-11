import path from 'path';
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
  loggedApp: async ({ browser }, use) => {
    const userAuthFile = path.join(__dirname, '../.auth/user.json');
    const context = await browser.newContext();
    const page = await context.newPage();
    const app = new AppPage(page);

    await app.loginPage.goto();
    await app.loginPage.headerFragment.navigateToLoginPage();
    await app.loginPage.login(envConfig.USER_EMAIL, envConfig.USER_PASSWORD);
    await app.page.context().storageState({ path: userAuthFile });

    await use(app);
    await context.close();
  },
});
