import { Box, Button, TextField } from '@mui/material';
import { orderPricingFields } from '../../arrayForms/orderFields';
export default function OrderPricing({
  register,
  gqlErrs,
  errors,
  onFocus,
  prefix = '',
  className,
  watch,
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

      <Button size="small" disabled>
        {orderPricingFields
          ? (watch(orderPricingFields[0].name + '_' + prefix) || 0) *
            (watch(orderPricingFields[1].name + '_' + prefix) || 0)
          : ''}
      </Button>
    </Box>
  );
}
