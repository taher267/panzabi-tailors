import { UserInputError } from 'apollo-server';
import Joi from 'joi';
import { Types } from 'mongoose';
import designServices from '../services/designServices.mjs';
import errorHandler from '../utils/errorHandler.mjs';

async function IsValid(payload) {
  try {
    let err = await Schema.validateAsync(payload, { abortEarly: false });
  } catch (e) {
    console.log(e);
  }
}

const newDesignSchema = Joi.object().keys({
  design_name: Joi.string().required(),
  type: Joi.array().items(Joi.string().required()).required(),
  designs: Joi.array()
    .items({
      item: Joi.string().required(),
      _id: Joi.string(),
      ds_id: Joi.number().required(),
    })
    .required(),
});

const updateDsignSchema = Joi.object().keys({
  design_name: Joi.string().required(),
  type: Joi.array().items(Joi.string().required()).required(),
  designs: Joi.array()
    .items({
      item: Joi.string().required(),
      _id: Joi.string().default(Types.ObjectId()),
      ds_id: Joi.number().required(),
      icon: Joi.object({
        _id: Joi.string(),
        src: Joi.string(),
      }),
    })
    .required(),
});

const newDesignValidation = (payload) =>
  newDesignSchema.validateAsync(payload, { abortEarly: false });

const designUpdateValidation = (payload) =>
  updateDsignSchema.validateAsync(payload, { abortEarly: false });
export default { newDesignValidation, designUpdateValidation };
