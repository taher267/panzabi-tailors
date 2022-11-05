import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const PriceFields = ({ errors, register, pricingKey, productLen, total }) => {
  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}
    >
      <TextField
        label="Quantity"
        type="number"
        {...register(`pricing.${pricingKey}.quantity`, {
          valueAsNumber: true,
          required: `Quantiry Mandatory`,
          min: 0,
          validate: (v) => {
            if (v > -1 && productLen > v) {
              return `Product quantity minimum ${productLen}`; //2
            }
          },
        })}
        error={errors?.pricing?.[pricingKey]?.quantity ? true : false}
        helperText={errors?.pricing?.[pricingKey]?.quantity?.message || ''}
      />
      <TextField
        label="Price"
        type="number"
        {...register(`pricing.${pricingKey}.price`, {
          valueAsNumber: true,
          required: `Price Mandatory`,
          min: 0,
        })}
        error={errors?.pricing?.[pricingKey]?.price ? true : false}
        helperText={errors?.pricing?.[pricingKey]?.price?.message || ''}
      />
      <TextField label="Total" value={total} inputProps={{ readOnly: true }} />
    </div>
  );
};
PriceFields.prototype = {
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  pricingKey: PropTypes.string.isRequired,
  productLen: PropTypes.array.isRequired,
};
export default PriceFields;
