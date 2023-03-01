import {
  FormControlLabel,
  FormGroup,
  TextField,
  Checkbox,
  MenuItem,
  Typography,
  Autocomplete,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import csses from '../../component/styles/common.module.css';
import stringToObject from '../utils/stringToObject';
import { DATE } from '../../utils';

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
    multiSelectLebel,
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
    Controller,
    control,
    // style,
    ...rest
  } = props;
  if (!Controller || !control)
    return (
      <Typography sx={{ color: 'red' }}>
        Missing Controller or control
      </Typography>
    );
  let helperText = '';
  let err = false;
  let objErrs = name?.split?.('.');
  if (
    gqlErrs?.[name] ||
    errors?.[name] ||
    errors?.[objErrs?.[0]]?.[objErrs?.[1]]?.message ||
    errors?.[objErrs?.[0]]?.[objErrs?.[1]]?.[objErrs?.[2]]?.message
  ) {
    err = true;
    helperText =
      gqlErrs?.[name] ||
      errors?.[name]?.message ||
      errors?.[objErrs?.[0]]?.[objErrs?.[1]]?.message ||
      errors?.[objErrs?.[0]]?.[objErrs?.[1]]?.[objErrs?.[2]]?.message;
  }
  const type = props?.type;
  // multiline→true∂rows→5
  const parameters = params ? stringToParamsObj?.(params) : {};

  switch (type || 'text') {
    case 'text':
    case 'number':
    case 'date':
    case 'single_select':
    case 'multi_select':
      const val = predefined?.[name]?.length ? predefined?.[name] : '';
      const value = Array.isArray(val) ? val.join('|') : val;
      const validate2 = stringToObject(validation);
      return (
        <>
          <Controller
            control={control}
            name={name}
            defaultValue={value}
            rules={{ ...validate2, validate }}
            render={({ field, fieldState: { error } }) => {
              const { onChange, ...restProps } = field;
              if (type === 'multi_select')
                return (
                  <Autocomplete
                    multiple
                    defaultValue={predefined}
                    id="tags-standard"
                    options={options}
                    // freeSolo={false}
                    getOptionLabel={(item) => item?.[multiSelectLebel]}
                    renderInput={(props) => {
                      return (
                        <TextField
                          {...props}
                          name={name}
                          sx={{ marginY: 1 }}
                          fullWidth
                          error={error ? true : false}
                          helperText={error?.message}
                          {...rest}
                        />
                      );
                    }}
                    onChange={(_, data) => {
                      onChange(data);
                      return data;
                    }}
                    // {...restProps}
                  />
                );
              return (
                <TextField
                  {...field}
                  onFocus={({ target: { name } }) =>
                    removeGqlErrors?.(name, gqlErrs, setGqlErrs)
                  }
                  // {...parameters}
                  color="secondary"
                  variant="filled"
                  label={name}
                  fullWidth
                  error={error ? true : false}
                  helperText={error ? error.message : ''}
                  {...rest}
                  {...parameters}
                  // select={type === 'single_select' ? true : false}
                >
                  {/* {type === 'single_select' && */}
                  {options?.map?.((op, i) => (
                    <MenuItem key={i} value={op}>
                      {op}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }}
          />
          {/* <TextField
              {...register?.(name, { ...validate2, validate })}
              defaultValue={value}
              name={name}
              onFocus={({ target: { name } }) =>
                removeGqlErrors?.(name, gqlErrs, setGqlErrs)
              }
              {...parameters}
              color="secondary"
              variant="filled"
              label={name}
              fullWidth
              error={err}
              helperText={helperText}
              {...rest}
              select={type === 'single_select' ? true : false}
            >
              {type === 'single_select' &&
                options?.map?.((op, i) => (
                  <MenuItem key={i} value={op}>
                    {op}
                  </MenuItem>
                ))}
            </TextField> */}
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
