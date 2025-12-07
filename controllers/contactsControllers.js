import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContactsController = async (req, res) => {
  const { id: owner } = req.user;
  const allContacts = await contactsService.listContacts({ owner });

  res.json(allContacts);
};

export const getOneContactController = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const contact = await contactsService.getContactById({ id, owner });
  if (!contact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(contact);
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const contact = await contactsService.deleteContactById({ id, owner });
  if (!contact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(contact);
};

export const createContactController = async (req, res) => {
  const { id: owner } = req.user;
  const newContact = await contactsService.addContact({ ...req.body, owner });

  res.status(201).json(newContact);
};

export const updateContactController = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const updatedContact = await contactsService.updateContactById(
    { id, owner },
    req.body
  );
  if (!updatedContact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(updatedContact);
};

export const updateStatusContactController = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const updateContactStatus = await contactsService.updateStatusContact(
    { id, owner },
    req.body
  );
  if (!updateContactStatus) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(updateContactStatus);
};
