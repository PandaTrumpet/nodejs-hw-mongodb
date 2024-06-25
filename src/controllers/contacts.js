import {
  addContact,
  getAllContacts,
  getContactById,
} from '../services/contact.js';
export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    data: contacts,
    message: 'Successfully found contacts!',
    status: `200`,
  });
};
export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
  res.status(200).json({
    data: contact,
    message: `Successfully found contact with id ${contactId}!`,
  });

  res.status(500).json({
    message: 'Internal Server Error',
  });
};
export const addContactController = async (req, res) => {
  const contact = await addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};
