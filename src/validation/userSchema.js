import Joi from 'joi';
import { emailRegexp } from '../constans/user-constans.js';
export const userRegisterSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().pattern(emailRegexp).email(),
  password: Joi.string().required().min(6),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().required().email().pattern(emailRegexp),
  password: Joi.string().required().min(6),
});
