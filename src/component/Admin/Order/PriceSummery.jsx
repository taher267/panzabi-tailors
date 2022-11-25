import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

const PriceSummery = ({ pricingDetail, advanced, setAdvanced }) => {
  const { totalPrice } = pricingDetail;
  return (
    <Box>
      <Typography variant="h5" sx={{ marginY: 2 }}>
        Price Summery
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
        <TextField
          label="Total Price"
          type="number"
          value={totalPrice}
          inputProps={{ readOnly: true }}
          fullWidth
        />

        <TextField
          label="Advanced"
          type="number"
          value={advanced}
          onChange={(e) => setAdvanced(e.target.value)}
          fullWidth
        />
        <TextField
          label="Due"
          type="number"
          value={totalPrice - advanced}
          inputProps={{ readOnly: true }}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default PriceSummery;
