import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";

import Contact from "./db/models/Contact.js";

export const listContacts = () => {
  Contact.findAll();
};

export const addContact = (payload) => Contact.create(payload);

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

// export const updateContactById = async (contactId, payload) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === contactId);
//   if (index === -1) return null;
//   contacts[index] = { ...contacts[index], ...payload };
//   await updateContacts(contacts);
//   return contacts[index];
// };

// export const deleteContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === contactId);
//   if (index === -1) return null;
//   const [result] = contacts.splice(index, 1);
//   await updateContacts(contacts);
//   return result;
// };

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
  //   getContactById,
  //   updateContactById,
  //   deleteContactById,
  addContact,
};
