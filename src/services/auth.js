import { UserCollection } from '../db/models/User.js';
import createHttpError from 'http-errors';
import { hashValue } from '../utils/hash.js';
export const findUser = (filter) => UserCollection.findOne(filter);

export const registerUser = async (data) => {
  const { password } = data;
  const hashPassword = await hashValue(password); // хеширование пароля

  return UserCollection.create({ ...data, password: hashPassword }); // распиливание
};

export const requestResetToken = async (email) => {
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  //доповнимо її трохи пізніше
};
