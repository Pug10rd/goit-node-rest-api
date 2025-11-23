import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.base": "Name must be a string",
  }),
  email: Joi.string().required().messages({
    "any.required": "Email is required",
    "string.base": "Email must be a string",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Phone is required",
    "string.base": "Phone must be a string",
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": "Name must be a string",
  }),
  email: Joi.string().messages({
    "string.base": "Email must be a string",
  }),
  phone: Joi.string().messages({
    "string.base": "Phone must be a string",
  }),
})
  .min(1)
  .messages({
    "object.min": "Body must have at least one field",
  });
