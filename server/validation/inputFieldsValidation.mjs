import { UserInputError } from 'apollo-server-core';
import config from '../config/config.mjs';
import errorHandler from '../utils/errorHandler.mjs';
import Joi from 'joi';
import mg from 'mongoose';
const fields = {
  label: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  type: Joi.string().trim(),
  template: Joi.string().trim().required(),
  sl_id: Joi.string().trim().required(),
  status: Joi.string().trim().required(),
  options: Joi.array().items(Joi.string().trim().required()),
  placeholder: Joi.string().trim(),
  params: Joi.string().trim(),
  validation: Joi.string().trim(),
  _id: Joi.string().trim(),
  icon: Joi.object({
    id: Joi.string().trim().required(),
    src: Joi.string().trim().uri().required(),
  }),
};
const fieldsSchema = Joi.array()
  .unique('name')
  .unique('sl_id')
  .items(Joi.object(fields).required())
  .required();

const newOrExistingFieldAddSchema = Joi.object({
  fieldGroup: Joi.string().trim().required(),
  existingGroup: Joi.string().trim(),
  fields: Joi.array()
    .unique('name')
    .unique('sl_id')
    .items(Joi.object(fields).required())
    .required(),
}).required();
// Input fields sync  Schema
const inputGroupFieldsSyncSchema = Joi.array()
  .unique('name')
  .unique('sl_id')
  .items(
    Joi.object({ ...fields, _id: Joi.string().trim().required() }).required()
  )
  .required();
const inputFieldsValidation = (payload) =>
  newOrExistingFieldAddSchema.validateAsync(payload, { abortEarly: false });

const inputFieldsUpdateValidation = async ({
  id,
  name,
  label,
  sl_id,
  type,
  template,
  status,
  placeholder,
  options,
  params,
}) => {
  try {
  } catch (e) {
    errorHandler(e);
  }
};

const inputFieldsSyncValidation = (payload) =>
  inputGroupFieldsSyncSchema.validateAsync(payload);
export default {
  inputFieldsValidation,
  inputFieldsUpdateValidation,
  inputFieldsSyncValidation,
};
