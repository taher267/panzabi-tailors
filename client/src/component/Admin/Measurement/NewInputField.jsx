import { Fragment, useState } from 'react';
import {
  LinearProgress,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Autocomplete,
  Chip,
} from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Add, Save, Delete } from '@mui/icons-material';
import { NEW_MEASUREMENT } from '../../graphql/Mutations/measurementMut';
import { errorFormat } from '../../utils/errorConv';
import {
  measuementInputFields,
  InputFieldValidation,
} from '../../arrayForms/measurementFields';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import stringToObject from '../../utils/stringToObject';
import Field from '../../ui/Action/Field';
import removeGqlErrors from '../../utils/removeGqlErrors';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
import { useEffect } from 'react';
import toCapitalize from '../../utils/toCapitalize';

const valuesInit = { fieldGroup: '', existingGroup: '' };
const initFields = {
  label: '',
  name: '',
  type: '',
  sl_id: '',
  template: '',
  status: '',
  placeholder: '',
  options: [],
  params: '',
  validation: '',
  icon: '',
};
const NewInputField = () => {
  const navigate = useNavigate();
  const [gqlErrs, setGqlErrs] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      ...valuesInit,
      fields: [initFields],
    },
  });

  const {
    mutation: createMeasurement,
    data,
    processing,
    bug,
  } = useMutationFunc('NEW_MEASUREMENT');

  //   console.dir(data);
  useEffect(() => {
    if (data) {
      reset();
      navigate('/dashboard/measurement', { state: 'reload' });
    }
  }, [data]);
  const {
    fields: arrayForm,
    append,
    remove,
  } = useFieldArray({
    name: 'fields',
    control,
  });
  const onSubmit = (data) => {
    setGqlErrs({});
    // const copyData = JSON.parse(JSON.stringify(data));
    data.fields = data.fields?.map?.((item) => {
      const { icon, options, type, placeholder, params, validation } = item;
      if (icon) {
        item.icon = JSON.parse(item.icon);
      } else {
        delete item?.icon;
      }
      if (!options?.length) {
        delete item?.options;
      }
      if (!type) {
        delete item?.type;
      }
      if (!placeholder) {
        delete item?.placeholder;
      }
      if (!params) {
        delete item?.params;
      }
      if (!validation) {
        delete item?.validation;
      }
      return item;
    });
    console.log(data);
    // createMeasurement({ variables: { measures: data } });
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
        <Typography variant="h6">নতুন পরিমাপ</Typography>
        <Typography>
          Instruction for validation syntex=&gt; Validation
          /required→true←message∂
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Controller
            rules={{
              required: { value: true, message: `Field group is mandatory!` },
            }}
            control={control}
            name="fieldGroup"
            render={({
              field,
              fieldState: { error },
              // field: { onChange, onBlur, value, ref }
            }) => (
              <TextField
                {...field}
                fullWidth
                variant="standard"
                label="Field Group"
                sx={{ marginY: 1 }}
                error={error ? true : false}
                helperText={error?.message}
              />
            )}
          />{' '}
          <Controller
            rules={{
              pattern: { value: /^[0-9a-fA-F]{24}$/, message: `Invalid id` },
              // minLength: { value: 24, message: `Invalid id` },
            }}
            control={control}
            name="existingGroup"
            render={({
              field,
              fieldState: { error },
              // field: { onChange, onBlur, value, ref }
            }) => (
              <TextField
                {...field}
                fullWidth
                variant="standard"
                label="Existing Group id"
                sx={{ marginY: 1 }}
                error={error ? true : false}
                helperText={error?.message}
              />
            )}
          />
          {arrayForm?.map?.((formItem, i) => (
            <Box key={i}>
              <Typography variant="h5">Item {i + 1}</Typography>
              <Box
                sx={{
                  paddingLeft: 2,
                  display: { sm: 'block', md: 'grid' },
                  gridTemplateColumns: {
                    md: 'repeat(auto-fit, minmax(450px, 1fr))',
                  },
                  gap: 2,
                  background: i % 2 === 0 ? 'rgba(128, 0, 128, 0.3)' : '',
                  width: '100%',
                }}
                // sx={{ background: 'rgba(128, 0, 128, 0.3)', paddingLeft: 2 }}
              >
                {Object.keys(formItem)?.map?.((keye, j) => {
                  if (keye === 'id')
                    return (
                      <Button
                        variant="outlined"
                        key={keye}
                        disabled={arrayForm?.length === 1}
                        sx={{
                          'span.MuiButton-startIcon svg': { fontSize: 25 },
                        }}
                        onClick={() => remove(keye)}
                        startIcon={<Delete />}
                      />
                    );
                  return (
                    <Fragment key={`${i}.${j}`}>
                      <Controller
                        rules={InputFieldValidation?.[keye]?.rules}
                        control={control}
                        name={`fields.${i}.${keye}`}
                        render={({
                          field,
                          fieldState: { error },
                          // field: { onChange, onBlur, value, ref }
                        }) => {
                          if (keye === 'options')
                            return (
                              <Autocomplete
                                multiple
                                id="tags-standard"
                                options={[]}
                                freeSolo
                                // renderTags={(value, getTagProps) => {
                                //   return value.map((option, index) => (
                                //     <Chip
                                //       size="small"
                                //       variant="filled"
                                //       label={option}
                                //       {...getTagProps({ index })}
                                //     />
                                //   ));
                                // }}
                                renderInput={(props) => (
                                  <TextField
                                    {...props}
                                    sx={{ marginY: 1 }}
                                    label="Options (Wrire and Hit Enter key)"
                                    fullWidth
                                    error={error ? true : false}
                                    helperText={error?.message}
                                    placeholder={
                                      InputFieldValidation?.[keye]?.placeholder
                                    }
                                  />
                                )}
                                onChange={(_, data) => {
                                  field.onChange(data);
                                  return data;
                                }}
                              />
                            );

                          return (
                            <TextField
                              {...field}
                              select={
                                InputFieldValidation?.[keye]?.type ===
                                'single_select'
                              }
                              variant="standard"
                              label={toCapitalize(keye)}
                              // placeholder={formItem.placeholder}
                              sx={{ marginY: 1 }}
                              error={error ? true : false}
                              helperText={error?.message}
                              placeholder={
                                InputFieldValidation?.[keye]?.placeholder
                              }
                              fullWidth
                            >
                              {InputFieldValidation?.[keye]?.options?.map?.(
                                (option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                )
                              )}
                            </TextField>
                          );
                        }}
                      />
                    </Fragment>
                  );
                })}
              </Box>
            </Box>
          ))}
          <Box
            sx={{
              marginTop: 1,
              display: { md: 'flex' },
              gap: 1,
              'button:first-child': {
                marginBottom: {
                  sm: 1,
                  xs: 1,
                  md: 0,
                },
              },
            }}
          >
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
              sx={{ width: { md: '74%' } }}
            >
              Add Measurement Fields
            </Button>
            <Button
              variant="contained"
              fullWidth
              endIcon={<Add />}
              type="button"
              onClick={() => append(initFields)}
              sx={{ width: { md: '25%' } }}
            >
              Add Fields
            </Button>
          </Box>
        </form>
      </Box>
    </AdminLayout>
  );
};

export default NewInputField;
