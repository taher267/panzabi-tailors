import * as React from 'react';
import { Autocomplete, Stack, TextField } from '@mui/material';

export default function OrderProduct({
  products,
  selectedProducts,
  error,
  defaultProducts,
}) {
  // const options = [{ name: 'The Shawshank Redemption', y: 1994 }];
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={products}
        getOptionLabel={(option) => option.name}
        defaultValue={defaultProducts}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      />
      {/* <Autocomplete
        multiple
        id="tags-standard"
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
      /> */}
    </Stack>
  );
}
