import createHttpError from 'http-errors';
import { findUser, loginUser, registerUser } from '../services/auth.js';

export const registerUserContrller = async (req, res) => {
  const { email } = req.body; //достаем почту,диструктуризируя его
  const user = await findUser({ email });

  if (user) {
    throw createHttpError(409, ' Email in use');
  }
  const newUser = await registerUser(req.body);
  const data = { name: newUser.name, email: newUser.email };

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};

export const loginUserController = async (req, res) => {
  await loginUser(req.body);
};
