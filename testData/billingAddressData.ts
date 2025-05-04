import { IBillingAddress } from '../typings/IBillingAddress';
import { faker } from '@faker-js/faker';

export const billingAddress: IBillingAddress = {
  street: faker.location.street(),
  city: faker.location.city(),
  state: faker.location.state(),
  country: faker.location.country(),
  postcode: faker.location.zipCode(),
};
