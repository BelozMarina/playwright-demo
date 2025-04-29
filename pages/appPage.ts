import { Page } from '@playwright/test';
import { HomePage } from './home/home.page';
import { LoginPage } from './login.page';
import { ProductPage } from './product.page';

export class App {
  page: Page;
  homePage: HomePage;
  loginPage: LoginPage;
  productPage: ProductPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.productPage = new ProductPage(page);
  }
}
