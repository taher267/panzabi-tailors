import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Head from '../../../../graphql/Head';
import GridItem from '../../../../ui/GridItem';
import SingleOrderSummary from './SingleOrderSummary';
const sx = {
  display: { xs: 'block', sm: 'flex' },
  justifyContent: 'space-between',
  'p:last-child': { color: 'var(--black)' },
};

const gridSx = {
  // marginBottom: '40px'
};

const ItemBoxSx = {
  display: { md: 'block', lg: 'flex', sm: 'flex' },
};

const Item = GridItem({
  styles: {
    height: '100%',
    paddingBottom: 0,
  },
});

const CustomerDetailsAndBasicSingleOrderInfo = ({
  customer: { name, phone_no, email, _id },
  order_items,
  ...rest
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Head title={`${name}, ${phone_no}`} />
      <Grid
        container
        // sx={{ marginBottom: '40px' }}
        spacing={{ xs: 1, md: 3, sm: 1 }}
        // columns={{ xs: 4, sm: 4, md: 12 }}
      >
        {/* Customer info */}

        <Grid item xs={12} sm={12} md={4} sx={gridSx}>
          <Item>
            <Box sx={{ ...sx }}>
              <Typography>Name:</Typography>
              <Typography>{name}</Typography>
            </Box>
            <Box sx={sx}>
              <Typography>Phone No:</Typography>
              <Typography>{phone_no}</Typography>
            </Box>
            {(email && (
              <Box sx={sx}>
                <Typography>Email</Typography>
                <Typography>{email}</Typography>
              </Box>
            )) ||
              ''}
          </Item>
        </Grid>
        <SingleOrderSummary
          {...{ ...rest, sx: { ...sx, ...ItemBoxSx }, gridSx }}
        />
      </Grid>
      <Button
        disabled={rest?.order_status === 'NEW' ? false : true}
        variant="contained"
        fullWidth
        sx={{ marginY: 4 }}
        onClick={() => {
          navigate(`/dashboard/order/new/${_id}`, { replace: true });
        }}
      >
        Add New Item
      </Button>
    </>
  );
};
export default CustomerDetailsAndBasicSingleOrderInfo;
