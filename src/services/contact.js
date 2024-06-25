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
export const patchContact = async (contactId, data, options = {}) => {
  const contact = await ContactCollection.findOneAndUpdate(
    { _id: contactId },
    data,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!contact || !contact.value) return null;
  return {
    data: contact.value,
    isNew: Boolean(contact?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) =>
  ContactCollection.findOneAndDelete({ _id: contactId });
