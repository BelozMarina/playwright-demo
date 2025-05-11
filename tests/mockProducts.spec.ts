import { test } from '../fixtures';
import jsonMock from '../testData/mocks/product.mock.json';

test('mockProducts', async ({ app }) => {
  await app.homePage.mockProductsResponse(jsonMock);
  await app.homePage.goto();
  await app.homePage.expectMockProductsResponse();
});
