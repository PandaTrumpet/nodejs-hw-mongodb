import { UserCollection, SessionCollection } from '../db/models/User.js';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { hashValue } from '../utils/hash.js';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constans/index.js';
export const registerUser = async (data) => {
  const { password } = data;
  const hashPassword = await hashValue(password); // хеширование пароля

  return await UserCollection.create({ ...data, password: hashPassword }); // распиливание
};
export const findUser = (filter) => UserCollection.findOne(filter);

export const loginUser = async (data) => {
  const { password, email } = data;
  const user = await UserCollection.findOne({
    email,
  });
  if (!user) {
    throw createHttpError(404, 'Email not found');
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw createHttpError(401, 'Password invalid');
  }

  await SessionCollection.deleteOne({ userId: user._id });
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};
