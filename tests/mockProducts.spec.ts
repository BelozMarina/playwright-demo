import { test } from '../fixtures';
import jsonMock from '../testData/mocks/product.mock.json';

test('mockProducts @T714acc0c', { tag: '@regression' }, async ({ app }) => {
  await app.homePage.mockProductsResponse(jsonMock);
  await app.homePage.goto();
  await app.homePage.expectMockProductsResponse();
});
