import { Router } from 'express';
import { validateBody } from '../middleware/validateBody.js';
import { userRegisterSchema } from '../validation/userSchema.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserContrller } from '../controllers/auth-controller.js';
const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userRegisterSchema),
  ctrlWrapper(registerUserContrller),
);
