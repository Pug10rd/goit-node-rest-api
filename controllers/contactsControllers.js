import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContactsController = async (req, res) => {
  const allContacts = await contactsService.listContacts();
  console.log(res);

  return res.json(allContacts);
};

// export const getOneContactController = async (req, res) => {
//   const { id } = req.params;
//   const contact = await contactsService.getContactById(id);
//   if (!contact) {
//     throw HttpError(404, `Contact with id=${id} not found`);
//   }
//   res.json(contact);
// };

// export const deleteContactController = async (req, res) => {
//   const { id } = req.params;
//   const contact = await contactsService.deleteContactById(id);
//   if (!contact) {
//     throw HttpError(404, `Contact with id=${id} not found`);
//   }
//   res.json(contact);
// };

export const createContactController = async (req, res) => {
  const newContact = await contactsService.addContact(req.body);

  res.status(201).json(newContact);
};

// export const updateContactController = async (req, res) => {
//   const { id } = req.params;
//   const updatedContact = await contactsService.updateContactById(id, req.body);
//   if (!updatedContact) {
//     throw HttpError(404, `Contact with id=${id} not found`);
//   }
//   res.json(updatedContact);
// };
