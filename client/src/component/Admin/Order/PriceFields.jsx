import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@mui/material';

const PriceFields = ({ errors, register, pricingKey, productLen, total }) => {
  const key = pricingKey?.toString?.() ? '.' + pricingKey : '';
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
      <TextField
        fullWidth
        label="Quantity"
        type="number"
        {...register(`pricing${key}.quantity`, {
          valueAsNumber: true,
          required: `Quantiry Mandatory`,
          min: { value: 1, message: `Minimum Product quantity 1 !` },
          validate: (v) => {
            if (productLen > v) {
              return `Product quantity minimum ${productLen}`; //2
            }
          },
        })}
        error={
          errors?.pricing?.[pricingKey]?.quantity
            ? true
            : errors?.pricing?.quantity
            ? true
            : false
        }
        helperText={
          errors?.pricing?.[pricingKey]?.quantity?.message ||
          errors?.pricing?.quantity?.message ||
          ''
        }
      />
      <TextField
        label="Price"
        type="number"
        {...register(`pricing${key}.price`, {
          valueAsNumber: true,
          required: `Price is Mandatory`,
          min: { value: 1, message: `Minimum Product price 1` },
        })}
        fullWidth
        error={
          errors?.pricing?.[pricingKey]?.price
            ? true
            : errors?.pricing?.price
            ? true
            : false
        }
        helperText={
          errors?.pricing?.[pricingKey]?.price?.message ||
          errors?.pricing?.price?.message ||
          ''
        }
      />
      <TextField
        fullWidth
        label="Total"
        value={total}
        inputProps={{ readOnly: true }}
      />
    </Box>
  );
};
PriceFields.prototype = {
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  pricingKey: PropTypes.string.isRequired,
  productLen: PropTypes.array.isRequired,
};
export default PriceFields;
