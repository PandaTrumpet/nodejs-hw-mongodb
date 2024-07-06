import { UserCollection } from '../db/models/User.js';
import { hashValue } from '../utils/hash.js';
export const registerUser = async (data) => {
  const { password } = data;
  const hashPassword = await hashValue(password); // хеширование пароля

  return await UserCollection.create({ ...data, password: hashPassword }); // распиливание
};

export const findUser = (filter) => UserCollection.findOne(filter);
