import { useState } from 'react';
import {
  LinearProgress,
  Checkbox,
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Save, Sync, SyncAlt } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
import classes from './new-customer.module.css';

import {
  newCustomerFields,
  newCustomerTransportFields,
} from '../../arrayForms/customerForm';
import { useParams } from 'react-router-dom';
import useSingleCustomer from '../../hooks/useSingleCustomer';
import { errorFormat } from '../../utils/errorConv';
import useMutationFunc from './../../hooks/gql/useMutationFunc';
const init = {
  name: '',
  phone_no: '',
  email: '',
  address: '',
  // delivery_by: '',
  // delivery_charge: '',
  // delivery_address: '',
  // delivery_phone: '',
  engage: '',
};
// const animatedComponents = makeAnimated();
const EditCustomer = () => {
  const { id: ID } = useParams();
  const { processing, customer, bug } = useSingleCustomer(ID);
  const [gqlErrs, setGqlErrs] = useState({});

  // controlling Mutation
  const {
    mutation: updateCustomer,
    processing: loading,
    data,
  } = useMutationFunc('EDIT_CUSTOMER');

  const [deliveryFields, setDeliveryFields] = useState(false);
  // use form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValue: { ...init } });

  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  const onSubmit = (updateData) => {
    updateCustomer({ variables: { id: ID, ...updateData } });
  };
  return (
    <AdminLayout>
      {(loading || processing) && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <Box>
        <Typography variant="h5" sx={{ marginBottom: 2, color: '#009dea' }}>
          <Sync /> গ্রাহক তথ্য আপডেট
        </Typography>
        {!processing && (
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            {newCustomerFields?.map(
              ({ name, validation, defaultError, ...field }) => (
                <TextField
                  defaultValue={customer?.[name] || init?.[name]}
                  key={name}
                  onFocus={onFocus}
                  error={gqlErrs?.[name] ? true : errors?.[name] ? true : false}
                  helperText={
                    gqlErrs?.[name]
                      ? gqlErrs?.[name]
                      : errors?.[name]
                      ? errors?.[name]?.message || defaultError
                      : ''
                  }
                  {...register(name, { ...validation })}
                  {...field}
                  color="secondary"
                  variant="filled"
                  fullWidth
                  sx={{ marginBottom: 1 }}
                />
              )
            )}
            <h4>
              Delivery information
              <Checkbox
                checked={deliveryFields}
                onClick={({ target: { checked } }) =>
                  setDeliveryFields(checked)
                }
              />
            </h4>
            {deliveryFields && (
              <Box className={classes.deliveryDetails}>
                {newCustomerTransportFields?.map(
                  ({ name, validation, defaultError, ...field }) => (
                    <Box key={name}>
                      <TextField
                        fullWidth
                        onFocus={onFocus}
                        variant="filled"
                        {...register(name, { ...validation })}
                        helperText={
                          gqlErrs?.[name]
                            ? gqlErrs?.[name]
                            : errors?.[name]
                            ? errors?.[name]?.message || defaultError
                            : ''
                        }
                        {...field}
                      />
                    </Box>
                  )
                )}
              </Box>
            )}

            <Button
              variant="contained"
              fullWidth
              onFocus={onFocus}
              endIcon={<Save />}
              type="submit"
            >
              Add Customer
            </Button>
          </form>
        )}
      </Box>
    </AdminLayout>
  );
};

export default EditCustomer;
