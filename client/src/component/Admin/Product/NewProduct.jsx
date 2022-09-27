import { useMutation } from '@apollo/client';
import { Fragment, useState, useEffect } from 'react';
import { LinearProgress, Box, TextField, Button } from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
import { NEW_PRODUCT } from '../../graphql/Mutations/productMut';
import { errorFormat } from '../../utils/errorConv';
import { productFields } from '../../arrayForms/productForm';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const valuesInit = { name: '', description: '', price: '', category: '' };

const NewProduct = () => {
  const navigate = useNavigate();
  const [gqlErrs, setGqlErrs] = useState({});
  const [inputFields, setInputFields] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { ...valuesInit } });
  const [createProduct, { data, loading, error }] = useMutation(NEW_PRODUCT, {
    update(proxy, result) {},
    onError(e) {
      setGqlErrs(errorFormat(e));
    },
    onCompleted() {
      reset({ ...valuesInit });
      navigate('/dashboard/measurement', { state: 'reload' });
    },
  });

  //   console.dir(data);
  //   console.dir('validErrs', validErrs);
  const onSubmit = (data) => {
    setGqlErrs({});
    console.log(data);
    // createProduct({ variables: { ...data } });
  };

  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  const handleFieldsQty = (sign) => {
    let allFields = [...inputFields];
    let allItems = [...allFields].pop();
    let update = [
      [...allFields].slice(0, -1).concat({
        ...allItems,
        items: [...allItems.items].concat([[...allItems.items].pop()]),
      }),
    ];
    setInputFields(update);
  };
  useEffect(() => {
    // setInputFields([...productFields]);
  }, []);
  return (
    <AdminLayout>
      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {
        <div>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            {productFields?.map((field) => {
              let { name, defaultError, validation, ...rest } = field;
              if (typeof name === 'string')
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
                    error={
                      gqlErrs?.[name] ? true : errors?.[name] ? true : false
                    }
                    helperText={
                      gqlErrs?.[name]
                        ? gqlErrs?.[name]
                        : errors?.[name]
                        ? errors?.[name]?.message || defaultError
                        : ''
                    }
                    {...rest}
                  />
                );
              else if (Array.isArray(name)) {
                return (
                  <Fragment key={name}>
                    <h4>Measurement Item</h4>
                    <div>
                      {field.items.map((items, idx) => {
                        return (
                          <Fragment key={idx}>
                            {items.map((item) => {
                              let {
                                name: itemName,
                                defaultError: errMsg,
                                validation: itemValidation,
                                ...remaining
                              } = item;
                              return (
                                <TextField
                                  style={{ width: '33%' }}
                                  key={itemName}
                                  {...register(itemName, { ...itemValidation })}
                                  name={itemName}
                                  onFocus={onFocus}
                                  color="secondary"
                                  variant="filled"
                                  error={
                                    gqlErrs?.[itemName]
                                      ? true
                                      : errors?.[itemName]
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    gqlErrs?.[itemName]
                                      ? gqlErrs?.[itemName]
                                      : errors?.[itemName]
                                      ? errors?.[itemName]?.message || errMsg
                                      : ''
                                  }
                                  {...remaining}
                                />
                              );
                            })}
                          </Fragment>
                        );
                      })}
                    </div>
                  </Fragment>
                );
              }
            })}
            <Button
              type="button"
              onClick={() => handleFieldsQty('+')}
              variant="outlined"
            >
              +
            </Button>
            <Button
              type="button"
              onClick={() => handleFieldsQty('-')}
              variant="outlined"
            >
              -
            </Button>
            <Button
              // disabled={
              //   loading ||
              //   Object.keys(gqlErrs).length > 0 ||
              //   Object.keys(errors).length > 0
              // }
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
