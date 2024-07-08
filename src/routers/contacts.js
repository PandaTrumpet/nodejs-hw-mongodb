import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middleware/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middleware/authenticate.js';
const contactRouter = Router();
contactRouter.use(authenticate);

contactRouter.get('/', ctrlWrapper(getAllContactsController));

contactRouter.get(
  '/:contactId',

  ctrlWrapper(getContactByIdController),
);
contactRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(addContactController),
);
contactRouter.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
contactRouter.delete(
  '/:contactId',

  ctrlWrapper(deleteContactController),
);
export default contactRouter;
