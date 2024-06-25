import { Router } from 'express';
import { getAllContacts, getContactById } from '../services/contact.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addContactController,
  getAllContactsController,
  getContactByIdController,
} from '../controllers/contacts.js';
import isValidId from '../middleware/isValidId.js';
const contactRouter = Router();
contactRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactRouter.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);
contactRouter.post('/contacts', ctrlWrapper(addContactController));
export default contactRouter;
