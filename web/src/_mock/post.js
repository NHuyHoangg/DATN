import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const posts = [...Array(52)].map((_, index) => ({
  id: faker.number.int(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  name: faker.person.fullName(),
  phone_number: faker.phone.number(),
  status: sample(['active', 'block']),
  role: sample(['admin', 'user']),
  email: faker.internet.email(),
  street: faker.location.street(),
  province: faker.location.state(),
}));
