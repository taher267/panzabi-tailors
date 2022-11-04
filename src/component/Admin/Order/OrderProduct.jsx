import * as React from 'react';
import { Autocomplete, TextField } from '@mui/material';

export default function OrderProduct({ products, selectedProducts, error }) {
  // const options = [{ name: 'The Shawshank Redemption', y: 1994 }];
  // console.log(error);
  return (
    <Autocomplete
      multiple
      id="multiple-limit-tags"
      options={products}
      getOptionLabel={(o) => o.name}
      filterSelectedOptions
      onChange={selectedProducts}
      renderInput={(p) => {
        // console.log(p);
        return (
          <TextField
            helperText={error?.message || ''}
            {...p}
            error={error ? true : false}
            label="Products"
            placeholder="Favorites"
          />
        );
      }}
      sx={{ width: '500px' }}
    />
  );
}
