import * as React from 'react';
import { Autocomplete, TextField } from '@mui/material';

export default function OrderProduct({
  products,
  selectedProducts,
  error,
  defaultProducts,
}) {
  // const options = [{ name: 'The Shawshank Redemption', y: 1994 }];
  return (
    <Autocomplete
      multiple
      id="multiple-limit-tags"
      options={products}
      getOptionLabel={(o) => o.name}
      filterSelectedOptions
      onChange={selectedProducts}
      defaultValue={defaultProducts}
      renderInput={(p) => {
        return (
          <TextField
            helperText={error?.message || ''}
            {...p}
            error={error ? true : false}
            label="Products"
            variant="filled"
            placeholder="Favorites"
          />
        );
      }}
      sx={{ width: '500px' }}
    />
  );
}