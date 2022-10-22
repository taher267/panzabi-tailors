import { TextareaAutosize, TextField } from '@mui/material';
import React from 'react';
import csses from '../../../component/styles/common.module.css';
import stringToObject from '../../utils/stringToObject';
const Field = (params) => {
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
    errors,
    style,
    ...rest
  } = params;

  let label = params?.label || '';
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
  switch (params?.type || 'text') {
    case 'text':
    case 'number':
    case 'date':
      const val = predefined?.[name]?.length ? predefined?.[name] : '';
      const value = Array.isArray(val) ? val.join('|') : val;
      return (
        <>
          <TextField
            {...register(name, { ...stringToObject(validation) })}
            defaultValue={value}
            name={name}
            onFocus={({ target: { name } }) =>
              removeGqlErrors(name, gqlErrs, setGqlErrs)
            }
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
              {...register(name, { ...validation })}
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
    case 'textarea':
      return (
        <>
          {params?.label && (
            <label className={err ? csses.error : ''}>{label}</label>
          )}
          <TextareaAutosize
            {...register(name, { ...validation })}
            defaultValue={predefined?.[name] || ''}
            name={name}
            onFocus={({ target: { name } }) =>
              removeGqlErrors(name, gqlErrs, setGqlErrs)
            }
            minRows="3"
            color="secondary"
            variant="filled"
            label={name}
            className={err ? csses.error : ''}
            {...rest}
            style={{ width: 'calc(100% - 05px)', maxWidth: '100%', ...style }}
          />
          {err && (
            <p
              style={{ margin: 0, padding: 0 }}
              className={err ? csses.error : ''}
            >
              {helperText ? helperText : ''}
            </p>
          )}
        </>
      );
    default:
      return <div />;
  }
};

export default Field;
