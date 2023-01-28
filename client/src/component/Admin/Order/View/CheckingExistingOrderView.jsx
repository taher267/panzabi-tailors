import { Box, Typography } from '@mui/material';
const CheckingExistingOrderView = ({ prevOrderData, customerInfo }) => {
  const { _id, order_no, customer, order_status, updatedAt, totalPrice } =
    prevOrderData;

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Typography variant="h6">Searched Order Info</Typography>
      <Box
        sx={{
          maxWidth: '100%',
        }}
      >
        <Typography sx={{ color: 'var(--black)' }}>
          Customer ID:{' '}
          <span
            style={{
              color: `var(--${
                customerInfo?._id === customer?._id ? 'blue' : 'danger'
              })`,
            }}
          >
            {customer?._id}
          </span>
        </Typography>
        <Typography sx={{ color: 'var(--black)' }}>
          Order No: <span style={{}}>{order_no}</span>
        </Typography>
        <Typography sx={{ color: 'var(--black)' }}>
          Order Status:{' '}
          <span
            style={{
              color: `var(--${
                order_status === 'COMPLETED' ? 'danger' : 'blue'
              })`,
            }}
          >
            {order_status === 'COMPLETED'
              ? `Customer order status is ${order_status}, impossible to include any item`
              : order_status}
          </span>
        </Typography>
        <Typography sx={{ color: 'var(--black)' }}>
          Last Update:{' '}
          <span style={{ color: `var(--black)` }}>{updatedAt}</span>
        </Typography>
        <Typography sx={{ color: 'var(--black)' }}>
          Order ID : <span style={{ color: `var(--black)` }}>{_id}</span>
        </Typography>
        <Typography sx={{ color: 'var(--black)' }}>
          Total Price :{' '}
          <span style={{ color: `var(--black)` }}>{totalPrice}</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default CheckingExistingOrderView;
