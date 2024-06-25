import { ContactCollection } from '../db/models/contact.js';
export const getAllContacts = async () => {
  const contacts = await ContactCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactCollection.findById(contactId);
  return contact;
};
export const addContact = async (data) => {
  const contact = await ContactCollection.create(data);
  return contact;
};
