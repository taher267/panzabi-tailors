import { Fragment, useState, useEffect } from 'react';
import {
  LinearProgress,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';

import {
  productFields,
  measuementItemsFields,
} from '../../arrayForms/productForm';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
const valuesInit = { name: '', description: '', price: '', category: '' };

const NewProduct = () => {
  const navigate = useNavigate();
  const [gqlErrs, setGqlErrs] = useState({});
  const [inputMeasuermentFields, setInputMeasuermentFields] = useState([
    ...measuementItemsFields,
  ]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { ...valuesInit } });
  const {
    mutation: createProduct,
    processing,
    bug,
    data,
  } = useMutationFunc('NEW_PRODUCT', null, setGqlErrs);
  //   console.dir(data);
  //   console.dir('validErrs', validErrs);
  const onSubmit = (newData) => {
    setGqlErrs({});
    createProduct({
      variables: { ...newData, price: parseInt(newData?.price) || 0 },
    });
    // createMeasurement({ variables: { ...newData } });
  };

  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  const handleFieldsQty = (sign) => {
    if (sign === '+') {
      setInputMeasuermentFields([
        ...inputMeasuermentFields,
        measuementItemsFields[0],
      ]);
    } else {
      let arrs = [...inputMeasuermentFields];
      if (arrs.length === 1) return;
      arrs.splice(sign, 1);
      setInputMeasuermentFields(arrs);
    }
  };
  useEffect(() => {
    // setInputFields([...productFields]);
  }, []);
  return (
    <AdminLayout>
      {processing && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {
        <div>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            {productFields?.map((field) => {
              let { name, defaultError, validation, ...rest } = field;
              return (
                <TextField
                  key={name}
                  {...register(name, { ...validation })}
                  name={name}
                  onFocus={onFocus}
                  color="secondary"
                  variant="filled"
                  label={name}
                  fullWidth
                  error={gqlErrs?.[name] ? true : errors?.[name] ? true : false}
                  helperText={
                    gqlErrs?.[name]
                      ? gqlErrs?.[name]
                      : errors?.[name]
                      ? errors?.[name]?.message || defaultError
                      : ''
                  }
                  {...rest}
                  sx={{ marginBottom: '5px' }}
                />
              );
            })}

            <select
              {...register('category', { required: true })}
              style={{
                width: '100%',
                padding: '10px',
                background: 'transparent',
                color: '#000',
              }}
            >
              <option value="">Select</option>
              <option value="type-1">type-1</option>
              <option value="type-2">type-2</option>
            </select>
            {/* {inputMeasuermentFields?.map((fields, idx) => {
              return (
                <div style={{ display: 'flex' }} key={idx}>
                  {fields.map((field, i) => {
                    let { name, defaultError, validation, ...rest } = field;
                    return (
                      <TextField
                        key={name + (idx + i).toString()}
                        {...register(name + '_' + idx.toString(), {
                          ...validation,
                        })}
                        name={name + '_' + idx.toString()}
                        onFocus={onFocus}
                        color="secondary"
                        variant="filled"
                        label={name + '_' + idx.toString()}
                        fullWidth
                        error={
                          gqlErrs?.[name + '_' + idx.toString()]
                            ? true
                            : errors?.[name + '_' + idx.toString()]
                            ? true
                            : false
                        }
                        helperText={
                          gqlErrs?.[name + '_' + idx.toString()]
                            ? gqlErrs?.[name + '_' + idx.toString()]
                            : errors?.[name + '_' + idx.toString()]
                            ? errors?.[name + '_' + idx.toString()]?.message ||
                              defaultError
                            : ''
                        }
                        {...rest}
                      />
                    );
                  })}
                  <Button
                    type="button"
                    onClick={() => handleFieldsQty(idx)}
                    variant="outlined"
                  >
                    -
                  </Button>
                </div>
              );
            })}
            <Button
              type="button"
              onClick={() => handleFieldsQty('+')}
              variant="outlined"
            >
              +
            </Button> */}

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
        </div>
      }
    </AdminLayout>
  );
};

export default NewProduct;
