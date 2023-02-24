import { UserInputError } from 'apollo-server-core';
import config from '../config/config.mjs';
import errorHandler from '../utils/errorHandler.mjs';
const inputFieldsValidation = async (payload) => {
  try {
  } catch (e) {
    errorHandler(e);
  }
};
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
export default { inputFieldsValidation, inputFieldsUpdateValidation };

// console.log(/\d[∂^]+$/.test('vkfjdf∂'));
// console.log('required→true←Label is mandartory!∂'.split(/∂|←/));
// [^∂]
