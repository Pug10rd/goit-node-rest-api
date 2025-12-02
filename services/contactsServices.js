// import fs from "fs/promises";
// import path from "path";
// import { nanoid } from "nanoid";
// import { fileURLToPath } from "url";

import Contact from "./db/models/Contact.js";

export const listContacts = () => Contact.findAll();

export const addContact = (payload) => Contact.create(payload);

export const getContactById = (id) => Contact.findByPk(id);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const contactsPath = path.join(__dirname, "db", "contacts.json");

// const updateContacts = (contacts) =>
//   fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// export async function listContacts() {
//   const file = await fs.readFile(contactsPath, "utf-8");
//   const parsedData = await JSON.parse(file);
//   return parsedData;
// }

// export async function getContactById(contactId) {
//   const contacts = await listContacts();
//   const result = contacts.find((item) => item.id === contactId);
//   return result || null;
// }

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

// export async function addContact(payload) {
//   const contacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     ...payload,
//   };
//   contacts.push(newContact);
//   await updateContacts(contacts);
//   return newContact;
// }

export default {
  listContacts,
  getContactById,
  updateContactById,
  updateStatusContact,
  deleteContactById,
  addContact,
};
