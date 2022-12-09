import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
// import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import clonning from '../../../../utils/clonning';
import useGetQurey from '../../../../hooks/gql/useGetQurey';
import OrderItemCard from '../../OrderItemCard2';
import { useForm, useWatch } from 'react-hook-form';
import removeGqlErrors from '../../../../utils/removeGqlErrors';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const arrToObj = (data = [], key, selector) => {
  let newObje = {};
  for (const item of clonning(data)) {
    if (typeof selector === 'object') {
      let vals = {};
      for (const sel of selector || []) {
        vals[sel] = item[sel];
      }
      newObje[item[key]] = vals;
    } else {
      newObje[item[key]] = item[selector];
    }
  }
  return newObje;
};

export default function EditItem({ handleClickOpen, open, ...props }) {
  const {
    designs,
    measurements,
    products,
    order_date,
    price,
    quantity,
    connection,
    editId,
  } = props;
  const [gqlErrs, setGqlErrs] = React.useState({});
  const [orderProduct, setOrderProduct] = React.useState({ up: [], down: [] });
  const {
    data: measurementsFields,
    error,
    loading,
  } = useGetQurey(
    'ALL_MEASUREMENTS',
    {
      key: `template:${
        connection === 'up' ? 'template-01' : 'template-02'
      },status:ACTIVE`,
    },
    'allMeasurements'
  );
  const { data: all_products } = useGetQurey(
    'PRODUCTS_NAME_ID_CAT',
    null,
    'allProducts'
  );
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'all',
  });
  //   console.log(measurementsFields);
  //   console.log(arrToObj(measurements, 'msr_id', ['size']));
  //   console.log(arrToObj(products, '_id', 'name'));
  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  const watching = useWatch({
    control,
    name: connection,
  });

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClickOpen}
        TransitionComponent={Transition}
      >
        <AppBarWrapper {...{ handleClickOpen }} />
        <Box sx={{ height: '100%', paddingX: 5 }}>
          <form onSubmit={handleSubmit}>
            {(all_products && measurementsFields && (
              <OrderItemCard
                {...{
                  //Common
                  all_products,
                  errors,
                  register,
                  gqlErrs,
                  setGqlErrs,
                  onFocus,
                  removeGqlErrors,
                  //product
                  setOrderProduct,
                  productType: connection === 'up' ? 'type-1' : 'type-2',
                  fieldName: `${connection}_products`,
                  //Measurement
                  measurementPrefix: `_${connection}`,
                  measurementFields: measurementsFields,
                  // measurementFields: devideMeasurement?.down || [],
                  // desings: desings?.down || [],
                  type: connection,
                  watching,
                  //Pricing
                  // productLen: orderProduct?.down?.length || 0,
                  // total: pricingDetail?.down?.total || 0,
                  // pricingKey: 1,
                }}
              />
            )) ||
              ''}
          </form>
        </Box>

        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            ></Typography>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleClickOpen}
            >
              Update
            </Button>
          </Toolbar>
        </AppBar>
      </Dialog>
    </div>
  );
}

const AppBarWrapper = ({ handleClickOpen }) => (
  <AppBar sx={{ position: 'relative' }}>
    <Toolbar>
      <Typography variant="h6" component="div">
        <Button color="inherit" onClick={handleClickOpen}>
          <MinimizeIcon />
        </Button>
      </Typography>
      <Typography sx={{ flex: 1 }} variant="h6" component="div">
        Update order item
      </Typography>
      <Button color="error" onClick={handleClickOpen}>
        <CloseIcon />
      </Button>
    </Toolbar>
  </AppBar>
);
