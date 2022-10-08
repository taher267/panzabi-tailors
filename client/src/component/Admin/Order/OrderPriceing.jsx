import { Box, TextField } from '@mui/material';
import { orderPricingFields } from '../../arrayForms/orderFields';
export default function OrderPricing({
  register,
  gqlErrs,
  errors,
  onFocus,
  prefix = '',
  className,
}) {
  return (
    <Box className={className}>
      {orderPricingFields?.map((item) => {
        const { name, validation, defaultError, ...rest } = item;
        return (
          <TextField
            key={name}
            {...register(name + '_' + prefix, { ...validation })}
            onFocus={onFocus}
            color="secondary"
            variant="filled"
            label={name}
            fullWidth
            error={
              gqlErrs?.[name + '_' + prefix]
                ? true
                : errors?.[name + '_' + prefix]
                ? true
                : false
            }
            helperText={
              gqlErrs?.[name + '_' + prefix]
                ? gqlErrs?.[name + '_' + prefix]
                : errors?.[name + '_' + prefix]
                ? errors?.[name + '_' + prefix]?.message || defaultError
                : ''
            }
            {...rest}
            sx={{ marginBottom: '5px' }}
          />
        );
      })}
    </Box>
  );
}
