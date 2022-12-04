import { Box, Typography } from '@mui/material';
const sx = {
  display: 'flex',
  justifyContent: 'space-between',
  border: '1px solid #ddd',
};
const SingleOrderSummary = ({
  advanced,
  createdAt,
  discount,
  due,
  order_no,
  order_status,
  totalPrice,
  totalQty,
  transport_charge,
}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        color: '#0e0e0e',
        gap: 1,
      }}
    >
      <Box sx={sx}>
        <Typography>Date:</Typography>
        <Typography>{createdAt}</Typography>
      </Box>
      <Box sx={sx}>
        <Typography>Total Price : </Typography>
        <Typography>{totalPrice}</Typography>
      </Box>
      <Box sx={sx}>
        <Typography>advanced : </Typography>
        <Typography> {advanced}</Typography>
      </Box>
      <Box sx={sx}>
        <Typography>discount : </Typography>
        <Typography> {discount}</Typography>
      </Box>
      <Box sx={sx}>
        <Typography>totalQty : </Typography>
        <Typography> {totalQty}</Typography>
      </Box>

      <Box sx={sx}>
        <Typography>due : </Typography> <Typography> {due}</Typography>
      </Box>
      <Box sx={sx}>
        <Typography>order_no : </Typography>
        <Typography> {order_no}</Typography>
      </Box>
      <Box sx={sx}>
        <Typography>order_status : </Typography>
        <Typography> {order_status}</Typography>
      </Box>
    </Box>
  );
};
export default SingleOrderSummary;
