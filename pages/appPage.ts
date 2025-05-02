import { Page } from '@playwright/test';
import { HomePage } from './home/home.page';
import { LoginPage } from './login.page';
import { ProductPage } from './product.page';
import { CheckoutPage } from './checkoutPage/checkout';

export class AppPage {
  page: Page;
  homePage: HomePage;
  loginPage: LoginPage;
  productPage: ProductPage;
  checkoutPage: CheckoutPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.productPage = new ProductPage(page);
    this.checkoutPage = new CheckoutPage(page);
  }
}
