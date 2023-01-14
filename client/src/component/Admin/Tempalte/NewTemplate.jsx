import { gql, useMutation } from '@apollo/client';
import { Fragment, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
import { NEW_MEASUREMENT } from '../../graphql/Mutations/measurementMut';
import { errorFormat } from '../../utils/errorConv';
import { measuementFields } from './../../arrayForms/measurementFields';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import stringToObject from '../../utils/stringToObject';
import Field from '../../ui/Action/Field';
import removeGqlErrors from '../../utils/removeGqlErrors';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
import { useEffect } from 'react';
import toCapitalize from '../../utils/toCapitalize';
import templateForm from '../../arrayForms/templateForm';
import { Autocomplete } from '@mui/material';

const valuesInit = { name: '', sl_id: '' };
const NewTempate = () => {
  const navigate = useNavigate();
  const [gqlErrs, setGqlErrs] = useState({});
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all', defaultValues: {} });
  const {
    mutation: createTemplate,
    data,
    processing,
    bug,
  } = useMutationFunc('NEW_TEMPLATE', null, setGqlErrs);

  const checkObj = (obj = {}) =>
    Object.keys(JSON.parse(JSON.stringify(obj))).length;
  useEffect(() => {
    if (data) {
      // reset();
      // navigate('/dashboard/measurement', { state: 'reload' });
    }
  }, [data]);
  console.log(errors);
  console.log(gqlErrs);
  const onSubmit = ({
    productsPlace,
    measurementsPlace,
    designsPlace,
    ...rest
  }) => {
    setGqlErrs({});
    let newData = { ...rest };

    if (checkObj(productsPlace)) {
      newData.productsPlace = JSON.parse(JSON.stringify(productsPlace));
    }
    if (checkObj(measurementsPlace)) {
      newData.measurementsPlace = JSON.parse(JSON.stringify(measurementsPlace));
    }
    if (checkObj(designsPlace)) {
      newData.designsPlace = JSON.parse(JSON.stringify(designsPlace));
    }
    // console.log(newData);
    createTemplate({ variables: { template: newData } });
  };

  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  return (
    <AdminLayout>
      {processing && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <Box>
        <Typography variant="h6">New Tempate</Typography>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {templateForm?.map?.((item, i) => {
            if (!Array.isArray(item)) {
              let { name: nam, rules, type, options, ...rest } = item;
              if (type === 'select') {
                return (
                  <Controller
                    key={nam}
                    control={control}
                    name={nam}
                    rules={rules}
                    render={({
                      field: { onChange, onBlur, value, ref, name },
                      fieldState: { error },
                    }) => {
                      return (
                        <Autocomplete
                          onBlur={onBlur}
                          id="combo-box-demo"
                          options={options}
                          onChange={(_, v) => onChange(v)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={rest?.label}
                              variant="standard"
                              error={
                                ((error || gqlErrs[name]) && true) || false
                              }
                              helperText={
                                (error && error?.message) ||
                                gqlErrs?.[name]?.message ||
                                ''
                              }
                            />
                          )}
                        />
                      );
                    }}
                  />
                );
              }
              return (
                <Controller
                  key={nam}
                  control={control}
                  name={nam}
                  rules={rules}
                  render={({
                    field: { onChange, onBlur, value, ref, name },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label={toCapitalize(name)}
                        placeholder={`${toCapitalize(name)}...`}
                        {...rest}
                        variant="standard"
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        onFocus={onFocus}
                        error={((error || gqlErrs[name]) && true) || false}
                        helperText={
                          (error && error?.message) ||
                          gqlErrs?.[name]?.message ||
                          ''
                        }
                        sx={{ marginBottom: 1 }}
                      />
                    );
                  }}
                />
              );
            } else {
              return (
                <Box
                  key={i}
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: `repeat(${item?.length || 1}, 1fr)`,
                  }}
                >
                  {item?.map?.(
                    ({ name: nam, type, options, rules, ...rest }) => {
                      if (type === 'select') {
                        return (
                          <Controller
                            control={control}
                            name={nam}
                            key={nam}
                            // rules={{ required: { value: true, messaage: 'select' } }}
                            render={({
                              field: { onChange, onBlur, value, ref, name },
                              fieldState: { error },
                            }) => {
                              return (
                                <Autocomplete
                                  onBlur={onBlur}
                                  // disablePortal
                                  id="combo-box-demo"
                                  options={options}
                                  // getOptionLabel={(item) => item.label}
                                  onChange={(_, v) => onChange(v)}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label={rest?.label}
                                      variant="standard"
                                    />
                                  )}
                                />
                              );
                            }}
                          />
                        );
                      }
                      return (
                        <Controller
                          key={nam}
                          control={control}
                          name={nam}
                          rules={rules}
                          render={({
                            field: { onChange, onBlur, value, ref, name },
                            fieldState: { error },
                          }) => {
                            return (
                              <TextField
                                label={toCapitalize(name)}
                                placeholder={`${toCapitalize(name)}...`}
                                {...rest}
                                variant="standard"
                                onChange={onChange}
                                onBlur={onBlur}
                                name={name}
                                onFocus={onFocus}
                                error={
                                  ((error || gqlErrs[name]) && true) || false
                                }
                                helperText={
                                  (error && error?.message) ||
                                  gqlErrs?.[name]?.message ||
                                  ''
                                }
                                sx={{ marginBottom: 1 }}
                              />
                            );
                          }}
                        />
                      );
                    }
                  )}
                </Box>
              );
            }
          })}

          {/* <Controller
            control={control}
            name="name"
            rules={{}}
            render={({
              field: { onChange, onBlur, value, ref, name },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  label={toCapitalize(name)}
                  placeholder={`${toCapitalize(name)}...`}
                  fullWidth
                  variant="standard"
                  onChange={onChange}
                  onBlur={onBlur}
                  name={name}
                  onFocus={onFocus}
                  error={((error || gqlErrs[name]) && true) || false}
                  helperText={
                    (error && error?.message) || gqlErrs?.[name]?.message || ''
                  }
                  sx={{ marginBottom: 1 }}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="templateBody"
            rules={{
              required: { value: true, message: `Template body is mandatory!` },
            }}
            render={({
              field: { onChange, onBlur, value, name },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  label={toCapitalize(name)}
                  placeholder={`${toCapitalize(name)}...`}
                  fullWidth
                  variant="standard"
                  onChange={onChange}
                  onBlur={onBlur}
                  error={((error || gqlErrs[name]) && true) || false}
                  helperText={
                    (error && error?.message) || gqlErrs?.[name]?.message || ''
                  }
                  onFocus={onFocus}
                  multiline
                  minRows={5}
                  sx={{ marginBottom: 1 }}
                  name={name}
                />
              );
            }}
          /> */}

          <Button
            disabled={
              processing ||
              Object.keys(gqlErrs).length > 0 ||
              Object.keys(errors).length > 0
            }
            variant="contained"
            fullWidth
            endIcon={<Save />}
            type="submit"
          >
            Add Measurement
          </Button>
        </form>
      </Box>
    </AdminLayout>
  );
};

export default NewTempate;
