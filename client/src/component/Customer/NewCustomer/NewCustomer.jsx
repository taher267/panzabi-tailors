import { useState } from 'react';
import {
  LinearProgress,
  Checkbox,
  Box,
  TextField,
  Button,
} from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import classes from './new-customer.module.css';
import {
  newCustomerFields,
  newCustomerTransportFields,
} from '../../arrayForms/customerForm';

// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
import useMutationFunc from './../../hooks/gql/useMutationFunc';

const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

// const animatedComponents = makeAnimated();
const NewCustomer = () => {
  const [gqlErr, setGqlErr] = useState({});

  const {
    mutation: createCustomer,
    data,
    processing,
    bug,
  } = useMutationFunc('NEW_CUSTOMER', null, setGqlErr);

  const [deliveryFields, setDeliveryFields] = useState(false);
  // use form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: 'Abu Taher',
      phone_no: '01',
      email: '',
      address: '',
      // delivery_by: '',
      // delivery_charge: '',
      // delivery_address: '',
      // delivery_phone: '',
      engage: '',
    },
  });

  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErr };
    delete newErr[name];
    setGqlErr(newErr);
  };
  // console.log(check);
  const onSubmit = (data) => {
    createCustomer({ variables: data });
  };

  return (
    <AdminLayout>
      {processing && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {newCustomerFields?.map(
            ({ name, validation, defaultError, ...field }) => (
              <TextField
                key={name}
                onFocus={onFocus}
                error={gqlErr?.[name] ? true : errors?.[name] ? true : false}
                helperText={
                  gqlErr?.[name]
                    ? gqlErr?.[name]
                    : errors?.[name]
                    ? errors?.[name]?.message || defaultError
                    : ''
                }
                {...register(name, { ...validation })}
                {...field}
                color="secondary"
                variant="filled"
                fullWidth
              />
            )
          )}
          <h4>
            Delivery information
            <Checkbox
              checked={deliveryFields}
              onClick={({ target: { checked } }) => setDeliveryFields(checked)}
            />
          </h4>
          {deliveryFields && (
            <div className={classes.deliveryDetails}>
              {newCustomerTransportFields?.map(
                ({ name, validation, defaultError, ...field }) => (
                  <div key={name}>
                    <TextField
                      fullWidth
                      onFocus={onFocus}
                      variant="filled"
                      {...register(name, { ...validation })}
                      helperText={
                        gqlErr?.[name]
                          ? gqlErr?.[name]
                          : errors?.[name]
                          ? errors?.[name]?.message || defaultError
                          : ''
                      }
                      {...field}
                    />
                  </div>
                )
              )}
            </div>
          )}

          {/* <Select
            className={classes.enagageSelect}
            onChange={selectHandler}
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[colourOptions[4], colourOptions[5]]}
            isMulti
            options={colourOptions}
          /> */}
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
      </div>
    </AdminLayout>
  );
};

export default NewCustomer;
