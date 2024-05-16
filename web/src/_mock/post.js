import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const posts = [...Array(52)].map(() => ({
  post_id: faker.number.int(),
  verified: sample(['verified', 'waiting', 'denied']),
  seller_name: faker.person.fullName(),
  phone_number: faker.phone.number(),
  email: faker.internet.email(),
  street: faker.location.street(),
  ward: faker.location.street(),
  district: faker.location.street(),
  province: faker.location.state(),
  name: faker.lorem.words(),
  price: faker.number.int(),
  case_size: faker.number.int(),
  status: sample(['old', 'new']),
  date: faker.date.anytime(),
  media: [...Array(6)].map((_, hello) =>({
    content: `/assets/images/avatars/avatar_${hello + 1}.jpg`,
    product_index: hello+1,
  })),
  count: faker.number.int(),
  date_ago: sample(["9 tháng trước"]),
  formatted_price: faker.number.int(),
  case_size_num: faker.number.int(),
  description: faker.lorem.sentences(),
  brand: sample(["Casio", "Citizen", "Seiko", "Orient"]),
  strap_material: sample(["Da", "Kim loại", "Khác"]),
  battery_life: faker.number.int(),
  waterproof: sample(['Có', 'Không']),
  waterproof_num: faker.datatype.boolean(),
  gender: sample(['Nam', 'Nữ']),
  seller_id: faker.number.int(),
}));
