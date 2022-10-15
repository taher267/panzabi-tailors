import { Checkbox, TextField, Typography } from '@mui/material';
import csses from './order.module.css';
import { orderBasicFields } from '../../arrayForms/orderFields';
// import { useForm } from 'react-hook-form';
import { Fragment, useEffect, useState } from 'react';
import moment from 'moment';
import { DATE } from '../../../utils';
const OrderBasic = ({ register, errors, gqlErrs, onFocus }) => {
  const [urgent, setUngent] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm();

  useEffect(() => {
    document
      .querySelector("[name='order_date']")
      ?.setAttribute('max', moment().format(DATE));
    if (urgent) {
      document
        .querySelector("[name='delivery_date']")
        ?.setAttribute('min', moment().format(DATE));
    } else {
      document
        .querySelector("[name='delivery_date']")
        ?.setAttribute('min', moment().add(11, 'd').format(DATE));
    }
  });
  return (
    <Fragment>
      <Typography component="div" className={csses.gridFullLast}>
        <Checkbox
          onChange={() => {
            setUngent((p) => !p);
          }}
        />{' '}
        Urgent
      </Typography>
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
