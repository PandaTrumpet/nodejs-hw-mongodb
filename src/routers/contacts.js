import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
} from '../controllers/contacts.js';

const contactRouter = Router();
contactRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactRouter.get(
  '/contacts/:contactId',

  ctrlWrapper(getContactByIdController),
);
contactRouter.post('/contacts', ctrlWrapper(addContactController));
contactRouter.patch(
  '/contacts/:contactId',

  ctrlWrapper(patchContactController),
);
contactRouter.delete(
  '/contacts/:contactId',

  ctrlWrapper(deleteContactController),
);
export default contactRouter;
