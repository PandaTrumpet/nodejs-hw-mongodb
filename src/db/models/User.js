import { Schema, model } from 'mongoose';
import { emailRegexp } from '../../constans/user-constans.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const UserCollection = model('user', userSchema);

// схема для user
