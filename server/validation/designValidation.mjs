import { UserInputError } from 'apollo-server';
import Joi from 'joi';
import designServices from '../services/designServices.mjs';
import errorHandler from '../utils/errorHandler.mjs';

async function IsValid(payload) {
  try {
    let err = await Schema.validateAsync(payload, { abortEarly: false });
  } catch (e) {
    console.log(e);
  }
}

const newDesignValidation = async ({ design_name, type, designs }) => {
  const Schema = Joi.object().keys({
    name: Joi.string().required(),
    order_no: Joi.string()
      .required()
      .custom(async (v, helpers) => {
        const doesExist = await orderServices.findOrder(
          'order_no',
          v,
          'order_no'
        );
        if (doesExist) throw new Error(`Order no already exist!`);
      }),
    user: Joi.string().required(),
  });

  let errors = {};

  try {
    //design_name
    if (!design_name) errors.design_name = `Design name is mandatory!`;
    else if (await designServices.findDesign('design_name', design_name))
      errors.design_name = `Design name is already exists!`;
    //type
    if (!type?.length) errors.type = `Type is mandatory!`;
    // else if (!Array.isArray(type))errors.type = `Type should be an array!`;

    //type
    if (!designs?.length) errors.designs = `Designs are mandatory!`;
    else if (!Array.isArray(designs))
      errors.designs = `Design should be an array!`;

    // error throw
    if (!Object.keys(errors).length) return true;
    throw new UserInputError(
      `A number's of errors cought on ${Object.keys(errors).join(', ')}`,
      { errors }
    );
  } catch (e) {
    errorHandler(e);
  }
};

const designUpdateValidation = async ({ id, sl_id, name }) => {
  let errors = {};
  try {
    //name
    if (!name) errors.name = `Name is mandatory!`;
    else if (name.length < 2) errors.name = `Name at least 2 chars`;
    else if (name) {
      const check = await designServices.findMeasurement('name', name);
      if (check && check?.id !== id) errors.name = `Name is already exists!`;
    }
    // Serial id
    if (!sl_id) errors.sl_id = `Serial id is mandatory!`;
    else if (sl_id < 0) errors.sl_id = `Invalid serial id`;
    else if (sl_id) {
      const check = await designServices.findMeasurement('sl_id', sl_id);
      if (check && check?.id !== id)
        errors.sl_id = `Serial id is already exists!`;
    }

    // error throw
    if (!Object.keys(errors).length) return true;
    throw new UserInputError(
      `A number's of errors cought on ${Object.keys(errors).join(', ')}`,
      { errors }
    );
  } catch (e) {
    errorHandler(e);
  }
};
export default { newDesignValidation, designUpdateValidation };
