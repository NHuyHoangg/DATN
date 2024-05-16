import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const ad = [...Array(5)].map((_, index) => ({
  id: faker.number.int(),
  duration: sample([3, 5, 7]),
  price: sample([10000, 25000, 50000]),
  name: sample(["Gói đẩy tin 3 ngày", "Gói đẩy tin 5 ngày", "Gói đẩy tin 7 ngày"]),
  description: faker.lorem.sentences(),
}));
