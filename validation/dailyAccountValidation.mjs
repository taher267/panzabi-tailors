import { UserInputError } from 'apollo-server-core';
import dailyAccountService from '../services/dailyAccountServices.mjs';
import errorHandler from '../utils/errorHandler.mjs';
const newDailyAccountValidation = async ({
  date,
  purpose,
  type,
  cash_in,
  cash_out,
  name,
}) => {
  let errors = {};
  try {
    // console.log(name);
    //date
    if (!date) errors.date = `Date is mandatory!`;
    else if (new Date(date) === 'Invalid Date')
      errors.date = `Selected date is invalid!`;
    // Name
    if (!name) errors.name = `Name is mandatory!`;
    // purpose
    if (!purpose) errors.purpose = `Purpose is mandatory!`;
    // type
    if (!type) errors.type = `Type is mandatory!`;
    // cash_in cash_out
    if (!cash_in && !cash_out) {
      errors.cash_in = `cash in is mandatory!`;
      errors.cash_out = `Cash out is mandatory!`;
    } else if (cash_in && typeof parseInt(cash_in) !== 'number')
      errors.cash_in = `Cash in should be a number!`;
    else if (cash_out && typeof parseInt(cash_out) !== 'number')
      errors.cash_out = `Cash Out should b a number!`;

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
      const check = await dailyAccountService.findMeasurement('name', name);
      if (check && check?.id !== id) errors.name = `Name is already exists!`;
    }
    // Password
    if (!sl_id) errors.sl_id = `Serial id is mandatory!`;
    else if (sl_id < 0) errors.sl_id = `Invalid serial id`;
    else if (sl_id) {
      const check = await dailyAccountService.findMeasurement('sl_id', sl_id);
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
export default { newDailyAccountValidation, measurementUpdateValidation };
