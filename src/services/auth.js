import { UserCollection } from '../db/models/User.js';

import { hashValue } from '../utils/hash.js';
export const findUser = (filter) => UserCollection.findOne(filter);

export const registerUser = async (data) => {
  const { password } = data;
  const hashPassword = await hashValue(password); // хеширование пароля

  return UserCollection.create({ ...data, password: hashPassword }); // распиливание
};
