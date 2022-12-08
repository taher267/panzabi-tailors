import Typography from '@mui/material/Typography';
import GridItem from '../../../../ui/GridItem';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Item = GridItem({ styles: { height: '100%', paddingBottom: 0 } });
const SingleOrderSummary = ({
  discount,
  order_status,
  advanced,
  createdAt,
  due,
  order_no,
  totalPrice,
  totalQty,
  transport_charge,
  updatedAt,
  _id,
  sx,
  gridSx,
}) => {
  return (
    <>
      <Grid item xs={4} sm={12} md={4} sx={gridSx}>
        {/* Order basic info */}
        <Item>
          <Box sx={sx}>
            <Typography>Order No:</Typography>
            <Typography>{order_no}</Typography>
          </Box>
          <Box sx={sx}>
            <Typography>Order Status:</Typography>
            <Typography>{order_status}</Typography>
          </Box>
          <Box sx={sx}>
            <Typography>Order Product Qry:</Typography>
            <Typography>{totalQty}</Typography>
          </Box>
          <Box sx={sx}>
            <Typography>Total Price:</Typography>
            <Typography>{totalPrice}</Typography>
          </Box>
          <Box sx={sx}>
            <Typography>Transport Charge:</Typography>
            <Typography>{transport_charge}</Typography>
          </Box>
          <Box sx={sx}>
            <Typography>Advanced:</Typography>
            <Typography>{advanced}</Typography>
          </Box>
          <Box sx={sx}>
            <Typography>Due:</Typography>
            <Typography>{due}</Typography>
          </Box>
        </Item>
      </Grid>
      <Grid item xs={4} sm={12} md={4} sx={gridSx}>
        <Item>
          <Box sx={sx}>
            <Typography>Order ID:</Typography>
            <Typography>{_id}</Typography>
          </Box>
          <Box sx={sx}>
            <Typography>Order Issue:</Typography>
            <Typography>{createdAt}</Typography>
          </Box>
          <Box sx={sx}>
            <Typography>Update Issue:</Typography>
            <Typography>{updatedAt}</Typography>
          </Box>
        </Item>
      </Grid>
    </>
  );
};
export default SingleOrderSummary;

{
  /* <Box
      sx={
        {
          // display: 'grid',
          // gridTemplateColumns: 'repeat(4,1fr)',
          // color: '#0e0e0e',
          // gap: 1,
        }
      }
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
    </Box> */
}
