import { useMutation } from '@apollo/client';
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
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import classes from './new-customer.module.css';
import { NEW_CUSTOMER_QRY } from '../../graphql/Query/customer';
import { errorConversion } from '../../utils/errorConv';

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
const animatedComponents = makeAnimated();
const NewCustomer = () => {
  const [validErrs, setValidErrs] = useState({});
  const [values, setValues] = useState({});
  const [createUser, { data: newRegisterData, loading, error }] = useMutation(
    NEW_CUSTOMER_QRY,
    {
      update(proxy, result) {
        //   console.log(result);
      },
      onError(err) {
        setValidErrs(errorConversion(err));

        // console.log(err.graphQLErrors[0]?.extensions?.exception?.stacktrace[0].split('UserInputError: ')[1]);
      },
      variables: values,
    }
  );
  const [deliveryFields, setDeliveryFields] = useState(false);
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
      delivery_by: '',
      delivery_charge: '',
      delivery_address: '',
      delivery_phone: '',
      engage: '',
    },
  });
  //   console.dir(newRegisterData);
  //   console.dir('validErrs', validErrs);
  const onSubmit = (data) => {
    setValues({ ...data });
    // setTimeout(() => {
    //   console.log(values);
    // }, 1000);
    // console.log(data);
    createUser();
  };
  const selectHandler = (e) => {
    // console.log(e);
  };
  return (
    <AdminLayout>
      {/* {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )} */}
      <div>
        {Object.entries(validErrs).map((item) => (
          <p key={item[0]}>{item[1]}</p>
        ))}
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <TextField
            color="secondary"
            variant="filled"
            label="Customer Name"
            className={classes.MuiFilledInputRoot}
            fullWidth
            {...register('name', { required: true })}
            placeholder="Enter customer full name..."
          />
          {errors.name && <span>Name Mandatory</span>}

          <TextField
            variant="filled"
            label="Customer Phone no"
            className={classes.MuiFilledInputRoot}
            fullWidth
            {...register('phone_no', { required: true })}
            placeholder="Enter customer phone number..."
          />
          {errors.phone_no && <span>Phone Number Mandatory</span>}

          <TextField
            variant="filled"
            label="Customer Email"
            className={classes.MuiFilledInputRoot}
            fullWidth
            {...register('email')}
            placeholder="Enter customer email address..."
          />
          {errors.email && <span>{errors.email}</span>}

          <TextField
            variant="filled"
            label="Customer Address"
            className={classes.MuiFilledInputRoot}
            fullWidth
            {...register('address')}
            placeholder="Enter customer address..."
          />
          {errors.address && <span>{errors.address}</span>}
          <h4>
            Delivery information{' '}
            <Checkbox
              checked={deliveryFields}
              onClick={({ target: { checked } }) => setDeliveryFields(checked)}
            />
          </h4>
          {deliveryFields && (
            <div className={classes.deliveryDetails}>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  label="ডেলিভারি মাধ্যম"
                  className={classes.MuiFilledInputRoot}
                  {...register('delivery_by', { required: true })}
                  placeholder="Enter customer delivery by..."
                />
                {/* {errors.delivery_by && <span>{errors.delivery_by?.message}</span>} */}
                {errors.delivery_by && <span>Delivery By Mandatoty</span>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Delivery charge"
                  className={classes.MuiFilledInputRoot}
                  {...register('delivery_charge', { required: true })}
                  placeholder="Delivery Change"
                />
                {errors.delivery_charge && (
                  <span>Delivery Change Mandatoty</span>
                )}
                {/* {errors.delivery_charge && (
                <span>{errors.delivery_charge?.message}</span>
              )} */}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Delivery address"
                  className={classes.MuiFilledInputRoot}
                  {...register('delivery_address', { required: true })}
                  placeholder="Delivery deitals"
                />
                {errors.delivery_address && (
                  <span>Delivery Address Mandatoty</span>
                )}
                {/* {errors.delivery_address && (
                <span>{errors.delivery_address?.message}</span>
              )} */}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Delivery phone"
                  className={classes.MuiFilledInputRoot}
                  {...register('delivery_phone', { required: true })}
                  placeholder="Delivery Phone"
                />
                {errors.delivery_phone && <span>Delivery Phone Mandatoty</span>}
                {/* {errors.delivery_phone && (
                <span>{errors?.delivery_phone?.message}</span>
              )} */}
              </div>
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
