import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Autocomplete, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import Field from '../../ui/Action/Field';
import removeGqlErrors from '../../utils/removeGqlErrors';
import moment from 'moment';
import { DATE } from '../../../utils';
import useMutationFunc from '../../hooks/gql/useMutationFunc';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TODAY = moment().format(DATE);
export default function Payment({
  //   handleClose,
  open,
  paymentRow,
  handlePaymentRow,
}) {
  const { bug, mutation, data, processing } = useMutationFunc('UPDATE_PAYMENT');
  const [gqlErrs, setGqlErrs] = React.useState({});
  const {
    customerDetail,
    order_no,
    totalQty,
    totalPrice,
    discount,
    advanced,
    user,
    order_status,
    due,
    transport_charge,
    delivery_date,
  } = paymentRow;
  const [changeStatus, setChangeStaus] = React.useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'all',
    defaultValues: {
      payment_date: TODAY,
      amount: due,
      discount: 0,
    },
  });
  React.useEffect(() => {
    if (data) {
      reset();
      handlePaymentRow();
    }

    // if (bug) {
    //   console.log(bug);
    // }
  }, [data]);
  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  // console.log(data, 'data');
  // console.log('====================');
  return (
    <Box sx={{ width: '100%' }}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          '.MuiDialog-paperWidthSm.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
            width: '65% !important',
            maxWidth: '100% !important',
          },
        }}
      >
        <form
          style={{ maxWidth: '100%' }}
          onSubmit={handleSubmit(({ payment_date, amount, discount }) => {
            const atNow = moment().format().substring(10);
            let update = {};
            if (amount || discount) {
              update = {
                on: moment(payment_date + atNow).format(),
                discount: isNaN(discount) ? 0 : discount,
                amount: isNaN(amount) ? 0 : amount,
              };
            }
            if (changeStatus && order_status !== changeStatus)
              update.order_status = changeStatus;
            // console.log(update);
            mutation({ variables: { id: paymentRow._id, update } });
          })}
        >
          <Box
            sx={{
              display: 'flex',
              maxWidth: '100%',
              justifyContent: 'space-between',
            }}
          >
            <DialogTitle>
              Payment of {customerDetail?.name}, {customerDetail?.phone_no}
            </DialogTitle>
            <Typography>
              <CloseIcon onClick={handlePaymentRow} />
            </Typography>
          </Box>

          <DialogContent sx={{ maxWidth: '100% !important' }}>
            <Box sx={{ maxWidth: '100% !important' }}>
              <Typography>Order No : {order_no}</Typography>
              <Typography>Order Status : {order_status}</Typography>
              <Typography>Total Price : {totalPrice}</Typography>
              <Typography>
                Total Qty : {totalQty?.toString?.()?.padStart(2, 0)}
              </Typography>
              <Typography>Delivery Date : {delivery_date}</Typography>
            </Box>
            <Typography variant="h5" sx={{ marginY: 2 }}>
              Update Payment
            </Typography>
            {bug?.message && (
              <Typography sx={{ marginBottom: 2, color: '#ef0b0b' }}>
                {bug?.message}
              </Typography>
            )}
            <Box>
              <Autocomplete
                // disablePortal
                defaultValue={order_status}
                onChange={(_, v) => setChangeStaus(v)}
                options={[
                  'COMPLETED',
                  'ALTER',
                  'PROCESSING',
                  'NEW',
                  'DELIVIRED',
                ]}
                renderInput={(params) => (
                  <TextField {...params} label="Order Status" />
                )}
              />
              <Field
                {...{
                  label: 'Payment Amount',
                  register,
                  validation: `max→${due}←Customer maximum payment, ${due}∂min→0←Payment can't less than 0, ${due}∂valueAsNumber→true`,
                  errors,
                  name: 'amount',
                  onFocus,
                  gqlErrs,
                  setGqlErrs,
                  removeGqlErrors,
                  type: 'number',
                  inputProps: {
                    max: due,
                    min: 0,
                  },
                  sx: { marginBottom: 1 },
                }}
              />

              <Field
                {...{
                  label: 'Discount',
                  register,
                  validation: `max→${due}←Maximum Discount, ${due}∂min→0←Discount can't less than 0∂valueAsNumber→true`,
                  errors,
                  name: 'discount',
                  onFocus,
                  gqlErrs,
                  setGqlErrs,
                  removeGqlErrors,
                  type: 'number',
                  inputProps: {
                    max: due,
                    min: 0,
                  },
                  sx: { marginBottom: 1 },
                }}
              />
              <Field
                {...{
                  label: 'Payment Date',
                  type: 'date',
                  name: 'payment_date',
                  validation: `required→Payment date is mandatory!`,
                  register,
                  errors,
                  gqlErrs,
                  setGqlErrs,
                  removeGqlErrors,
                  sx: {
                    marginBottom: 1,
                    '.MuiInputBase-input::-webkit-calendar-picker-indicator': {
                      color: 'red !important',
                    },
                  },
                  inputProps: {
                    max: TODAY,
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={processing}
              type="submit"
              variant="contained"
              fullWidth
              onClick={() => {}}
            >
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
