import { Router } from 'express';
import { getAllContacts, getContactById } from '../services/contact.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addContactController,
  getAllContactsController,
  getContactByIdController,
} from '../controllers/contacts.js';
const contactRouter = Router();
contactRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);
contactRouter.post('/contacts', ctrlWrapper(addContactController));
export default contactRouter;
