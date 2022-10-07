import { Box, Checkbox, TextField, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useMemo, useState, Fragment } from 'react';

export default function DesignView2({
  alldesigns,
  designWithValue,
  setDesignWithValue,
  designsHandler,
}) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
      {Object.keys(alldesigns)?.length &&
        Object.keys(alldesigns).map((items_id) => {
          let { design_name, designs } = alldesigns[items_id];
          return (
            <Box key={items_id}>
              <Typography variant="h5">{design_name}</Typography>
              <Box>
                {/* {console.log(designs)} */}
                {designs?.map((dsn) => {
                  let { _id, item, isChecked, desc } = dsn;
                  return (
                    <Box
                      key={dsn._id}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                      }}
                    >
                      <Checkbox
                        onChange={(e) => designsHandler(e, items_id, true)}
                        name={_id}
                        checked={
                          designWithValue?.[items_id]?.[_id]?.isChecked || false
                        }
                      />
                      {item}
                      <TextField
                        name={_id}
                        value={designWithValue?.[items_id]?.[_id]?.desc || ''}
                        onChange={(e) => designsHandler(e, items_id)}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
    </Box>
  );
}
