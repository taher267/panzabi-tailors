import { TextField } from '@mui/material';
// import csses from './order.module.css';
import { orderBasicFields } from '../../arrayForms/orderForm';
// import { useForm } from 'react-hook-form';
import { Fragment } from 'react';

const OrderBasic = ({ register, errors, gqlErrs, onFocus }) => {
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm();
  return (
    <Fragment>
      {orderBasicFields?.map((field) => {
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
            // fullWidth
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
    </Fragment>
  );
};

export default OrderBasic;
