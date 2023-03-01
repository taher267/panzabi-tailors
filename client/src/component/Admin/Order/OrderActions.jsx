import { useEffect, useState } from 'react';
import CurrencyExchange from '@mui/icons-material/CurrencyExchange';
import { Link } from 'react-router-dom';
import {
  Visibility,
  Save,
  Delete,
  Check,
  ContentCopy,
} from '@mui/icons-material';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Box, Fab, CircularProgress } from '@mui/material';
import { green, red } from '@mui/material/colors';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
import { DASHBOARD_PATH, ORDER_PATH } from '../../../config';
// import useUpdateMutation from '../../hooks/gql/useUpdateMutation';
// import useMutationFunc from '../../hooks/gql/useMutationFunc';
// import Payment from './Payment';

export default function OrderActions({
  params,
  rowId,
  setRowId,
  handlePaymentRow,
}) {
  //   const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const { bug, mutation, data, processing } = useMutationFunc(
    'UPDATE_PAYMENT',
    setSuccess
  );
  const {
    mutation: delOrderItem,
    bug: err,
    data: del,
  } = useMutationFunc('DELETE_ORDER_ITEM', null, null, 'deleteOrder', [
    'allOrders',
  ]);

  const { id, row } = params;

  useEffect(() => {
    if (rowId === id && success) {
      setSuccess(false);
      setRowId('');
    }
  }, [rowId, data]);

  useEffect(() => {
    if (del?.success) {
      // window.location.reload();
    }
  }, [del]); //

  const updateHandle = () => {
    const { name, category, price, description, order_status } = row;
    mutation({
      variables: {
        id: rowId,
        update: { order_status },
      },
    });
  };
  return (
    <Box
      className="measuementActions"
      sx={{
        outline: 'none',
        m: 1,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Link to={`${DASHBOARD_PATH}/${ORDER_PATH}/${id}`}>
        <Button startIcon={<Visibility />} />
      </Link>
      {processing ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: bug ? red[500] : green[500],
            '&:hover': { bgcolor: bug ? red[700] : green[700] },
          }}
          disabled={id !== rowId || processing}
        >
          <Save onClick={updateHandle} />
        </Fab>
      )}
      {processing && id === rowId && (
        <CircularProgress
          size={52}
          sx={{
            color: green[700],
            position: 'absolute',
            top: -6,
            left: 18,
            zIndex: 1,
          }}
        />
      )}
      <Button>
        <Delete
          onClick={() => {
            if (confirm(`Are you sure to delete this order(${id})?`)) {
              delOrderItem({
                variables: { _id: id, customer: row.customer?._id },
              });
            }
          }}
        />
      </Button>

      <Button
        variant="outlined"
        disabled={row?.due < 1}
        onClick={handlePaymentRow}
        sx={{ border: 0, outline: 0, ':focus': { border: 0, outline: 0 } }}
        startIcon={<CurrencyExchange />}
      >
        Payment
      </Button>
      {/* <Button>
        <ContentCopy
        // onClick={() => {
        //   if (confirm(`Are you sure to delete this order(${id})?`)) {
        //     delOrderItem({ variables: { _id: id, customer: row.customer } });
        //   }
        // }}
        />
      </Button> */}
    </Box>
  );
}
