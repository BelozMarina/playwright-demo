import path from 'path';
import { envConfig } from '../env.config';
import { AppPage } from '../pages/appPage';
import { test as baseTest } from '@playwright/test';
// import fs from 'fs';

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
    // const isCI = process.env.CI === 'true';
    // let context;

    // if (!fs.existsSync(userAuthFile)) {
    // If no auth file, create new context and perform login
    const context = await browser.newContext();
    const page = await context.newPage();
    const app = new AppPage(page);

    await app.loginPage.goto();
    await app.loginPage.headerFragment.navigateToLoginPage();
    await app.loginPage.login(envConfig.USER_EMAIL, envConfig.USER_PASSWORD);
    await app.page.context().storageState({ path: userAuthFile });
    // } else {
    //   // If auth file exists, use it
    //   context = await browser.newContext({
    //     storageState: userAuthFile,
    //   });
    // }

    // const page = await context.newPage();
    // const app = new AppPage(page);
    await use(app);
    await context.close();
  },
});
