import { Box, LinearProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGetQurey from '../../../../hooks/gql/useGetQurey';
import AdminLayout from '../../../../Layout/AdminLayout';
import CustomerDetailsAndBasicSingleOrderInfo from './CustomerDetailsAndBasicSingleOrderInfo';
import OrderItemView from './OrderItemView';
// import SingleOrderSummary from './SingleOrderSummary';

const SingleOrder = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetQurey(
    'SINGLE_ORDER',
    { key: '_id', value: id },
    'getOrder'
  );
  // console.log(data);
  return (
    <AdminLayout>
      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <Box>
        {loading === false &&
        Object.keys(data?.customerDetail || {})?.length ? (
          <>
            <CustomerDetailsAndBasicSingleOrderInfo {...{ ...data }} />
            {/* <SingleOrderSummary {...{ ...data }} /> */}
            {data?.order_items?.length
              ? data?.order_items?.map?.((item, i) => (
                  <OrderItemView {...{ ...item }} key={i} />
                ))
              : ''}
          </>
        ) : (
          ''
        )}
      </Box>
    </AdminLayout>
  );
};

export default SingleOrder;
