import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@mui/material';

const PriceFields = ({ errors, register, arrKey, productLen, total }) => {
  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}
    >
      <TextField
        label="Quantity"
        type="number"
        {...register(`pricing.${arrKey}.quantity`, {
          valueAsNumber: true,
          required: `Quantiry Mandatory`,
          min: 0,
          validate: (v) => {
            // const len = productLen?.length || 0;
            // const len = orderProduct?.up?.length || 0;
            if (v > -1 && productLen > v) {
              return `Product quantity minimum ${productLen}`; //2
            }
          },
        })}
        error={errors?.pricing?.[arrKey]?.quantity ? true : false}
        helperText={errors?.pricing?.[arrKey]?.quantity?.message || ''}
      />
      <TextField
        label="Price"
        type="number"
        {...register(`pricing.${arrKey}.price`, {
          valueAsNumber: true,
          required: `Price Mandatory`,
          min: 0,
        })}
        error={errors?.pricing?.[arrKey]?.price ? true : false}
        helperText={errors?.pricing?.[arrKey]?.price?.message || ''}
      />
      <TextField label="Total" value={total} inputProps={{ readOnly: true }} />
    </div>
  );
};
PriceFields.prototype = {
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  arrKey: PropTypes.string.isRequired,
  productLen: PropTypes.array.isRequired,
};
export default PriceFields;
