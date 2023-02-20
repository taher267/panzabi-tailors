import { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import classes from './new-customer.module.css';
import {
  newCustomerFields,
  newCustomerTransportFields,
} from '../../arrayForms/customerForm';
import PersonAdd from '@mui/icons-material/PersonAddAlt';
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
import useMutationFunc from './../../hooks/gql/useMutationFunc';
import { useEffect } from 'react';
import Divider from '@mui/material/Divider';

// const animatedComponents = makeAnimated();
const NewCustomer = () => {
  const [gqlErr, setGqlErr] = useState({});
  const [gqlCommonErr, setGqlCommonErr] = useState({});

  const {
    mutation: createCustomer,
    data,
    processing,
    bug,
  } = useMutationFunc(
    'NEW_CUSTOMER',
    null,
    setGqlErr,
    null,
    ['ALL_CUSTOMERS'],
    setGqlCommonErr
  );

  const [deliveryFields, setDeliveryFields] = useState(false);
  // use form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      phone_no: '01',
      // delivery_by: '',
      // delivery_address: '',
      // delivery_phone: '',
    },
  });
  useEffect(() => {
    if (data) {
      reset();
    }
  }, [data]);

  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErr };
    delete newErr[name];
    setGqlErr(newErr);
  };
  // console.log(check);
  const onSubmit = (data) => {
    const variables = { ...data };
    if (!variables?.email) delete variables?.email;
    if (!variables?.address) delete variables?.address;

    createCustomer({ variables });
  };
  console.log(errors);
  return (
    <AdminLayout rightSX={{ paddingRight: 4 }}>
      {processing && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <Box>
        <Typography variant="h5">
          <PersonAdd color="primary" fontSize="60" /> নতুন গ্রাহক
        </Typography>
        <Divider />
      </Box>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {newCustomerFields?.map(({ name, validation, ...field }) => (
            <TextField
              key={name}
              onFocus={onFocus}
              error={gqlErr?.[name] ? true : errors?.[name] ? true : false}
              helperText={
                gqlErr?.[name]
                  ? gqlErr?.[name]
                  : errors?.[name]
                  ? errors?.[name]?.message
                  : ''
              }
              {...register(name, { ...validation })}
              {...field}
              color="secondary"
              variant="filled"
              fullWidth
              sx={{ marginY: 1 }}
            />
          ))}
          <Typography>
            Delivery information
            <Checkbox
              checked={deliveryFields}
              onClick={({ target: { checked } }) => setDeliveryFields(checked)}
            />
          </Typography>
          {deliveryFields && (
            <Box className={classes.deliveryDetails}>
              {newCustomerTransportFields?.map(
                ({ name, validation, ...field }) => {
                  const path = name?.split?.('.');
                  return (
                    <Box key={name}>
                      <TextField
                        key={name}
                        onFocus={onFocus}
                        error={
                          gqlErr?.[path?.[1]]
                            ? true
                            : errors?.[path?.[0]]?.[path?.[1]]
                            ? true
                            : false
                        }
                        helperText={
                          gqlErr?.[path?.[1]]
                            ? gqlErr?.[name?.split?.('.')?.[1]]
                            : errors?.[path?.[0]]?.[path?.[1]]
                            ? errors?.[path?.[0]]?.[path?.[1]]?.message
                            : ''
                        }
                        {...register(name, { ...validation })}
                        {...field}
                        color="secondary"
                        variant="filled"
                        fullWidth
                        sx={{ marginY: 1 }}
                      />
                    </Box>
                  );
                }
              )}
            </Box>
          )}

          <Button
            variant="contained"
            fullWidth
            onFocus={onFocus}
            endIcon={
              processing ? (
                <CircularProgress
                  sx={{ width: '23px !important', height: '23px !important' }}
                />
              ) : (
                <Save />
              )
            }
            type="submit"
            disabled={
              processing ||
              !!Object.keys(errors)?.length ||
              !!Object.keys(gqlErr)?.length
            }
          >
            Add Customer
          </Button>
        </form>
      </Box>
    </AdminLayout>
  );
};

export default NewCustomer;
