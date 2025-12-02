import Contact from "./db/models/Contact.js";

export const listContacts = () => Contact.findAll();

export const addContact = (payload) => Contact.create(payload);

export const getContactById = (id) => Contact.findByPk(id);

export const updateContactById = async (contactId, payload) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  await contact.update(payload);
  return contact;
};

export const updateStatusContact = async (contactId) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  await contact.update({ favorite: !contact.favorite });
  return contact;
};

export const deleteContactById = async (contactId) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  await contact.destroy(contactId);
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
