import { SessionCollection } from '../db/models/Session.js';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constans/index.js';
export const findSession = (filter) => SessionCollection.findOne(filter);

export const createSession = async (userId) => {
  await SessionCollection.deleteOne({ userId });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + THIRTY_DAYS);
  return SessionCollection.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
};

export const deleteSession = (filter) => SessionCollection.deleteOne(filter);
