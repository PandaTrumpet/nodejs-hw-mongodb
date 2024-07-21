import { UserCollection } from '../db/models/User.js';
import createHttpError from 'http-errors';
import { hashValue } from '../utils/hash.js';
import jwt from 'jsonwebtoken';

import { SMTP } from '../constans/index.js';
import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendEmail.js';
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
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '5m',
    },
  );

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetToken}">here</a> to reset your password!</p>`,
  });
};

export const resetPassword = async (payload) => {
  let entries;
  try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (error) {}
};
