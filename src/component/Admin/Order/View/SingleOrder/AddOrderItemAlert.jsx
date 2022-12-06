import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddOrderItemAlert({
  existedOrderAddItemAlert,
  itemAddDiologHandler,
}) {
  return (
    <Box>
      {/* <Button variant="outlined" onClick={itemAddDiologHandler}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={existedOrderAddItemAlert?.open || false}
        TransitionComponent={Transition}
        keepMounted
        onClose={itemAddDiologHandler}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Order item'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {existedOrderAddItemAlert?.message}
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
}
