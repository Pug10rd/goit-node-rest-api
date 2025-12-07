import Contact from "./db/models/Contact.js";

export const listContacts = (where) => Contact.findAll({ where });

export const addContact = (payload) => Contact.create(payload);

export const getContactById = (where) => Contact.findOne({ where });

export const updateContactById = async (where, payload) => {
  const contact = await getContactById(where);
  if (!contact) return null;
  await contact.update(payload);
  return contact;
};

export const updateStatusContact = async (where) => {
  const contact = await getContactById(where);
  if (!contact) return null;
  await contact.update({ favorite: !contact.favorite });
  return contact;
};

export const deleteContactById = async (where) => {
  const contact = await getContactById(where);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export default {
  listContacts,
  getContactById,
  updateContactById,
  updateStatusContact,
  deleteContactById,
  addContact,
};
