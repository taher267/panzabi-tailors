import { TextField } from '@mui/material';
import csses from './order.module.css';
import { orderMeasurementFields } from '../../arrayForms/orderForm';
import { useForm } from 'react-hook-form';
const OrderMeasuement = ({ register, errors, gqlErrs, onFocus }) => {
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm();
  return (
    <div className={csses.measuementFields}>
      {orderMeasurementFields?.map((field) => {
        if (Array.isArray(field)) {
          return (
            <div key={field[0].name}>
              {field.map((item) => {
                let { name, defaultError, validation, ...rest } = item;
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
                    sx={{ marginBottom: '5px' }}
                  />
                );
              })}
            </div>
          );
        } else {
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
        }
      })}
    </div>
  );
};

export default OrderMeasuement;
