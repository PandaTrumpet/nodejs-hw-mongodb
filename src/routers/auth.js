import { Router } from 'express';
import { validateBody } from '../middleware/validateBody.js';
import {
  userLoginSchema,
  userRegisterSchema,
} from '../validation/userSchema.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutController,
  refreshController,
  registerUserContrller,
} from '../controllers/auth-controller.js';
const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userRegisterSchema),
  ctrlWrapper(registerUserContrller),
);
export default authRouter;

authRouter.post(
  '/login',
  validateBody(userLoginSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));
authRouter.post('/logout', ctrlWrapper(logoutController));
