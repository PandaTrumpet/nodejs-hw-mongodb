import { UserCollection } from '../db/models/User.js';
export const registerUser = async (data) => {
  return await UserCollection.create(data);
};

export const findUser = (filter) => UserCollection.findOne(filter);
