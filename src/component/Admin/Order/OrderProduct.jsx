import * as React from 'react';
import { Autocomplete, Stack, TextField } from '@mui/material';

export default function OrderProduct({
  products,
  selectedProducts,
  error,
  defaultProducts,
  productLabel = '',
}) {
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={products}
        getOptionLabel={(option) => option.name}
        defaultValue={
          defaultProducts?.length
            ? [
                ...products.reduce((a, c) => {
                  for (const item of defaultProducts) {
                    if (c._id === item._id) {
                      a.push(c);
                    }
                  }

                  return a;
                }, []),
              ]
            : []
        }
        onChange={selectedProducts}
        renderInput={(params) => (
          <TextField
            error={error ? true : false}
            {...params}
            helperText={error?.message || ''}
            variant="standard"
            label={productLabel}
            placeholder={productLabel}
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
