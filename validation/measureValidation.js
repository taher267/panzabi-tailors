import { UserInputError } from 'apollo-server-core';
import measurementServices from '../services/measurementServices.js';
import errorHandler from '../utils/errorHandler.js';
const measurementValidation = async ({
  label,
  name,
  sl_id,
  template,
  status,
  type,
  options,
  icon,
}) => {
  let errors = {};
  try {
    // console.log(name);
    //name
    if (!label) errors.label = `Label is mandatory!`;
    else if (label.length < 2) errors.label = `Label at least 2 chars`;
    else if (await measurementServices.findMeasurement('label', label))
      errors.label = `Label is already exists!`;
    //name
    if (!name) errors.name = `Name is mandatory!`;
    else if (name.length < 2) errors.name = `Name at least 2 chars`;
    else if (await measurementServices.findMeasurement('name', name))
      errors.name = `Name is already exists!`;
    // Serial
    if (!sl_id) errors.sl_id = `Serial id is mandatory!`;
    else if (sl_id < 0) errors.sl_id = `Invalid serial id`;
    else if (await measurementServices.findMeasurement('sl_id', sl_id))
      errors.sl_id = `Serial id is already exists!`;

    // Type
    if (type === 'select' && !options?.length)
      errors.type = `Options is mandatory!`;
    // Template
    if (!template) errors.template = `Template id is mandatory!`;
    else if (!/^[A-Za-z_]+$/.test(template))
      errors.template = `Template name alphanumeric with underscore and without space`;
    // status
    if (!status?.length) errors.status = `Status id is mandatory!`;
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

const measurementUpdateValidation = async ({ id, sl_id, name }) => {
  let errors = {};
  try {
    //name
    if (!name) errors.name = `Name is mandatory!`;
    else if (name.length < 2) errors.name = `Name at least 2 chars`;
    else if (name) {
      const check = await measurementServices.findMeasurement('name', name);
      if (check && check?.id !== id) errors.name = `Name is already exists!`;
    }
    // Password
    if (!sl_id) errors.sl_id = `Serial id is mandatory!`;
    else if (sl_id < 0) errors.sl_id = `Invalid serial id`;
    else if (sl_id) {
      const check = await measurementServices.findMeasurement('sl_id', sl_id);
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
export default { measurementValidation, measurementUpdateValidation };

// console.log(/\d[∂^]+$/.test('vkfjdf∂'));
// console.log('required→true←Label is mandartory!∂'.split(/∂|←/));
// [^∂]
