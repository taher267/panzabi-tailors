import {
  FormControlLabel,
  FormGroup,
  TextField,
  Checkbox,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import csses from '../../../component/styles/common.module.css';
import stringToObject from '../../utils/stringToObject';
import { DATE } from '../../../utils';

// multiline→true∂rows→5
const stringToParamsObj = (params) => {
  const newObj = {};
  for (const item of params?.split('∂')) {
    const item2 = item?.split('→');
    if (item2.length === 2) {
      let parse = parseInt(item2[1]);
      let val = isNaN(parse) ? item2[1] : parse;
      if (val === 'true') val = true;
      else if (val === 'false') val = false;
      newObj[item2[0]] = val;
    } else {
      newObj[item2[0]] = true;
    }
  }
  return newObj;
};
// console.log(isNaN(parseInt({ some: '4' }.some)));
const Field = (props) => {
  const {
    register,
    validation,
    name,
    predefined,
    options,
    defaultError,
    gqlErrs,
    onFocus,
    setGqlErrs,
    removeGqlErrors,
    validate,
    params,
    errors,
    style,
    ...rest
  } = props;

  let helperText = '';
  let err = false;
  let objErrs = name.split('.');
  // console.log(errors[objErrs[0]]?.[objErrs[1]]?.message);
  if (
    gqlErrs?.[name] ||
    errors?.[name] ||
    errors[objErrs[0]]?.[objErrs[1]]?.message
  ) {
    err = true;
    helperText =
      gqlErrs?.[name] ||
      errors?.[name]?.message ||
      errors[objErrs[0]]?.[objErrs[1]]?.message;
  }
  const type = props?.type;
  // multiline→true∂rows→5
  const parameters = params ? stringToParamsObj(params) : {};
  switch (type || 'text') {
    case 'text':
    case 'number':
    case 'date':
      const val = predefined?.[name]?.length ? predefined?.[name] : '';
      const value = Array.isArray(val) ? val.join('|') : val;
      const validate2 = stringToObject(validation);
      React.useEffect(() => {
        if (type === 'date' && validate2.max) {
          document
            .querySelector(`[name='${name}']`)
            ?.setAttribute('max', moment().format(DATE));
        }
      }, [validate2.max, type]);

      React.useEffect(() => {
        if (type === 'date' && validate2.min) {
          document
            .querySelector(`[name='${name}']`)
            ?.setAttribute('min', moment().format(DATE));
        }
      }, [validate2.min, type]);

      return (
        <>
          <TextField
            {...register(name, { ...validate2, validate })}
            defaultValue={value}
            name={name}
            onFocus={({ target: { name } }) =>
              removeGqlErrors(name, gqlErrs, setGqlErrs)
            }
            {...parameters}
            maxRows={10}
            color="secondary"
            variant="filled"
            label={name}
            fullWidth
            error={err}
            helperText={helperText}
            {...rest}
          />
        </>
      );

    case 'single_select':
      return (
        <>
          <fieldset
            className={
              (err ? csses.error : '') + ' ' + csses.selectFieldSet || ''
            }
          >
            <legend>{rest?.label}</legend>
            <select
              className={csses.selectField}
              name={name}
              defaultValue={predefined?.[name] || ''}
              {...rest}
              {...register(name, { ...validation, validate })}
              style={{
                width: '100%',
                minHeight: '40px',
                border: 0,
                outline: 0,
              }}
              onFocus={({ target: { name } }) =>
                removeGqlErrors(name, gqlErrs, setGqlErrs)
              }
            >
              <option value="">Select {rest?.label}..</option>
              {options?.map((op) => (
                <option value={op} key={op}>
                  {op}
                </option>
              ))}
            </select>
          </fieldset>
          {err && <p className={csses.error}>{helperText}</p>}
        </>
      );
    case 'checkbox':
      return (
        <>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  {...register(name, { ...validation, validate })}
                  {...rest}
                />
              }
              label={rest?.label}
            />
          </FormGroup>
        </>
      );
    default:
      return <div />;
  }
};

export default Field;

// case 'date':
//       return (
//         <LocalizationProvider dateAdapter={moment}>
//           <DatePicker
//             label="Basic example"
//             value={new Date('2022-11-12')}
//             minDate={new Date('2022-11-12')}
//             onChange={(newValue) => {
//               // setValue(newValue);
//             }}
//             renderInput={(props) => {
//               console.log(props);
//               // <TextField {...props} />
//             }}
//           />
//         </LocalizationProvider>
//       );
