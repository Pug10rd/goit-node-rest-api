import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "db", "contacts.json");

export async function listContacts() {
  const file = await fs.readFile(contactsPath, "utf-8");
  const parsedData = await JSON.parse(file);
  return parsedData;
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  if (contactId) {
    const contact = await contacts.find((c) => c.id === contactId || null);
    return contact;
  }
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  if (contactId) {
    const contact = await contacts.find((c) => c.id === contactId || null);
    contacts.pop(contact);
    return contact;
  }
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  if (name && email && phone) {
    const newContact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }
  return true;
}

export default { listContacts, getContactById, removeContact, addContact };
