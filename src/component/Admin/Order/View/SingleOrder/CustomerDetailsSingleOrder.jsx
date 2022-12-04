import { Box, Typography } from '@mui/material';

const CustomerDetailsSingleOrder = ({ name, phone_no, email }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Typography>Name:</Typography>
        <Typography>{name}</Typography>
      </Box>
      <Box>
        <Typography>Phone No:</Typography>
        <Typography>{phone_no}</Typography>
      </Box>
      <Box>
        <Typography>Email</Typography>
        <Typography>{email}</Typography>
      </Box>
    </Box>
  );
};
export default CustomerDetailsSingleOrder;
