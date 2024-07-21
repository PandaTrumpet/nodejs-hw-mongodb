import createHttpError from 'http-errors';
import { findUser, registerUser, resetPassword } from '../services/auth.js';
// import { THIRTY_DAYS } from '../constans/index.js';
import { requestResetToken } from '../services/auth.js';
import { compareHash } from '../utils/hash.js';
import {
  createSession,
  deleteSession,
  findSession,
} from '../services/session.js';
const setupResponseSession = (
  res,
  { refreshToken, refreshTokenValidUntil, _id },
) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
};
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
  const { email, password } = req.body;
  const user = await findUser({ email });
  if (!user) {
    throw createHttpError(404, 'Email not found');
  }

  const passwordCompare = await compareHash(password, user.password);

  if (!passwordCompare) {
    throw createHttpError(404, 'Password invalid');
  }
  const session = await createSession(user._id);
  // if (!session) {
  //   throw createHttpError(404, 'Have no sessiom');
  // }
  console.log(session.accessToken);
  setupResponseSession(res, session);
  res.status(200).json({
    satus: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const refreshController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  const currentSession = await findSession({ _id: sessionId, refreshToken });
  if (!currentSession) {
    throw createHttpError(401, 'Session not found');
  }
  // console.log(currentSession);
  const refreshTokenExpired =
    new Date() > new Date(currentSession.refreshTokenValidUntil);
  if (refreshTokenExpired) {
    throw createHttpError(401, 'Session expired');
  }

  const newSession = await createSession(currentSession.userId);
  setupResponseSession(res, newSession);
  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: newSession.accessToken },
  });
};

export const logoutController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (!sessionId) {
    throw createHttpError(401, 'Session not found');
  }

  await deleteSession({ _id: sessionId });
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
  // console.log(sessionId);
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};
export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};
