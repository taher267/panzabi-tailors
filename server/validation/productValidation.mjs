import { UserInputError } from 'apollo-server';
import productServices from '../services/productServices.mjs';
import errorHandler from '../utils/errorHandler.mjs';
const newProductValidation = async ({ name, category }) => {
  let errors = {};
  try {
    //name
    if (!name?.trim()) errors.name = `Name is mandatory!`;
    else if (await productServices.findProduct('name', name))
      errors.name = `Name already exists!`;
    //category
    if (!category?.trim()) errors.category = `Category is mandatory!`;
    // error throw
    if (!Object.keys(errors).length) return true;
    throw new UserInputError(
      `A number's of errors cought on ${Object.keys(errors).join(', ')}`,
      { errors }
    );
  } catch (e) {
    return errorHandler(e);
  }
};

const updateProductValidation = async ({ _id, name, category }) => {
  let errors = {};
  try {
    //name
    if (!name?.trim()) errors.name = `Name is mandatory!`;
    else if (name) {
      const isName = await productServices.findProduct('name', name);
      if (isName && isName?.id?.toString() !== _id)
        errors.name = `Name already exists!`;
    }
    //category
    if (!category?.trim()) errors.category = `Category is mandatory!`;
    // error throw
    if (!Object.keys(errors).length) return true;
    throw new UserInputError(
      `A number's of errors cought on ${Object.keys(errors).join(', ')}`,
      { errors }
    );
  } catch (e) {
    return errorHandler(e);
  }
};

export default { newProductValidation, updateProductValidation };
