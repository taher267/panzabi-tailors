import React from 'react';
import { useEffect } from 'react';
import useGetQurey from '../../../hooks/gql/useGetQurey';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const CustomerInfoForOrder = ({
  customerID,
  setCustomerLoading,
  setCustomerInfo,
}) => {
  const { data, loading, error } = useGetQurey(
    'SINGLE_CUSTOMER',
    { key: '_id', value: customerID },
    'getCustomer'
  );
  console.log(data);
  useEffect(() => {
    setCustomerLoading?.(loading);
  }, [loading]);
  if (data)
    return (
      <Box>
        <Box
          sx={{
            color: 'rgba(0,0,0,.7)',
            fontWeight: 800,
            border: '1px solid rgba(255,255,255, 0.5)',
            padding: 2,
          }}
        >
          <Typography>Customer ID: {data._id}</Typography>
          <Typography>Customer Name: {data.name}</Typography>
          <Typography>Phone No: {data.phone_no}</Typography>
          <Typography>Orders: {data.orders.length}</Typography>
        </Box>
      </Box>
    );
};

CustomerInfoForOrder.propTypes = {
  customerID: PropTypes.string.isRequired,
  setCustomerLoading: PropTypes.func.isRequired,
  setCustomerInfo: PropTypes.func.isRequired,
};
export default CustomerInfoForOrder;
