import React from 'react';
import CRUDActions from '../ui/Action/CRUDActions';
import PersonOff from '@mui/icons-material/PersonOff';
import useMutationFunc from '../hooks/gql/useMutationFunc';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function CustomerActions({
  params,
  rowId,
  setRowId,
  setActionErrs,
}) {
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const {
    processing,
    data,
    mutation: updateMutation,
    bug,
  } = useMutationFunc('EDIT_CUSTOMER', setSuccess);

  const {
    processing: deleting,
    data: delData,
    mutation: delMutation,
    bug: delErr,
  } = useMutationFunc('DELETE_CUSTOMER', null, null, 'deleteCustomer', [
    'ALL_CUSTOMERS',
  ]);
  const { id, row } = params;

  React.useEffect(() => {
    if (delErr) {
      setActionErrs?.(delErr);
      setOpen((p) => !p);
    }
  }, [delErr]);

  const updateHandle = () => {
    let { name, email, phone_no, address, status, transportation } = row;
    let updateData = {
      name,
      email,
      phone_no,
      address,
      status,
      transportation,
    };

    updateMutation({ variables: { id, ...updateData } });
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {delErr?.message}
        </Alert>
      </Snackbar>
      <CRUDActions
        {...{
          bug,
          data,
          id,
          processing,
          rowId,
          setSuccess,
          success,
          updateHandle,
          setRowId,
          editUrl: '/dashboard/customer',
          delFunc: () => {
            if (confirm(`Are you sure to delete this User?`)) {
              delMutation({ variables: { _id: id } });
            }
          },
          DelIcon: PersonOff,
          deleting,
        }}
      />
    </>
  );
}
