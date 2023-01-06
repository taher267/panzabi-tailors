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
import OrderItemCard from '../../OrderItemCard';
import { useForm, useWatch } from 'react-hook-form';
import removeGqlErrors from '../../../../utils/removeGqlErrors';
import { CircularProgress, IconButton, Snackbar } from '@mui/material';
import designDevider from '../../../../utils/designDevider';
import {
  designFiltering,
  measurementKeyValue,
} from '../../../../../helpers/orderHelper';

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
const designDefaultValuesShape = (data) => {
  let newObj = {};
  for (const designsGroup of clonning(data)) {
    if (designsGroup?.group && designsGroup?.items?.length) {
      const { group, items } = designsGroup;
      let groupping = {};
      for (const { dsn_id, desc } of items) {
        groupping[dsn_id] = desc;
        // groupping[dsn_id] = { dsn_id, desc };
      }
      newObj[group] = groupping;
    }
  }
  // console.log(newObj, data);
  return newObj;
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
    _id,
  } = props;
  const [gqlErrs, setGqlErrs] = React.useState({});
  const [notice, setNotice] = React.useState(false);
  const [noticeMsg, setNoticeMsg] = React.useState('');
  const [orderProduct, setOrderProduct] = React.useState([]);
  const { data: all_designs, loading: designsLoading } = useGetQurey(
    'SPECIFIC_ALL_DESIGNS',
    null,
    'allDesigns'
  );
  const {
    data: measurementsFields,
    error,
    loading: measurementLoading,
  } = useGetQurey(
    'ALL_MEASUREMENTS',
    {
      key: `template:${
        connection === 'up' ? 'template-01' : 'template-02'
      },status:ACTIVE`,
    },
    'allMeasurements'
  );
  const { data: all_products, loading: productsLoading } = useGetQurey(
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
  // designDefaultValuesShape(designs);
  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  const watching = useWatch({
    control,
    name: connection,
  });
  const handleNotice = (mg) => {
    setNotice((p) => !p);
    setNoticeMsg(mg || 'Just Minimize the edit form!');
  };
  const handleClickOpenWithFromClear = (_, clearFrom) => {
    // if (clearFrom) {
    //   reset();
    // }
    // handleClickOpen();
    if (clearFrom && confirm(`Would you like to clear those all data!`)) {
      reset();
      handleClickOpen();
      //   handleNotice(`From has been cleared!`);
    } else {
      handleClickOpen();
      //   handleNotice();
    }
  };
  const pricing = useWatch({
    control,
    name: 'pricing',
  });
  const onSubmit = (d) => {
    console.log(orderProduct);
    // const desings = designFiltering(d.designs);
    // const measurements = measurementKeyValue(d.measurements);
    // const products = orderProduct;
    // const updateData = {
    //   products,
    //   ...d.pricing,
    //   measurements,
    //   desings,
    // };
    // console.log(updateData);
    // price
    // quantity
    // measurements
    // designs
    // order_date
    // sample
  };
  const connectionTypeProducts = (data = [], con) =>
    data.filter((p) => p.category === con);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClickOpen}
        TransitionComponent={Transition}
      >
        {((designsLoading || measurementLoading || productsLoading) && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
            }}
          >
            <CircularProgress />
          </Box>
        )) ||
          ''}
        <AppBarWrapper {...{ handleClickOpenWithFromClear }} />
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ paddingX: 5 }}>
              {(all_products && measurementsFields && (
                <OrderItemCard
                  {...{
                    //Common
                    products: connectionTypeProducts(
                      all_products,
                      connection === 'up' ? 'type-1' : 'type-2'
                    ),
                    errors,
                    register,
                    gqlErrs,
                    setGqlErrs,
                    onFocus,
                    removeGqlErrors,
                    //product
                    defaultProducts: products?.map(({ name, _id }) => ({
                      name,
                      _id,
                    })),
                    // defaultProducts: [...products],
                    setOrderProduct,
                    productType: connection === 'up' ? 'type-1' : 'type-2',
                    fieldName: `${connection}_products`,
                    //Measurement
                    measurementPrefix: '',
                    measurementFields: measurementsFields,
                    measurementDefaultValues: arrToObj(
                      measurements,
                      'msr_id',
                      'size'
                    ),
                    desings:
                      designDevider(all_designs || [])?.[connection] || [],
                    designsDefaultValues: designDefaultValuesShape(designs),
                    type: 'designs', //dsns designs
                    // type: connection,
                    watching,
                    //Pricing
                    productLen: orderProduct?.[connection]?.length || 0,
                    total: (pricing?.quantity || 0) * (pricing?.price || 0),
                    defaultQty: quantity,
                    defaultPrice: price,
                    defaultTotal: quantity * price,
                  }}
                />
              )) ||
                ''}
            </Box>
            <AppBar sx={{ position: 'relative', marginTop: 2 }}>
              <Toolbar>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                ></Typography>
                <Button
                  color="secondary"
                  variant="contained"
                  type="submit"
                  //   onClick={handleClickOpen}
                >
                  Update
                </Button>
              </Toolbar>
            </AppBar>
          </form>
        </Box>
      </Dialog>
      <Snackbar
        open={notice}
        autoHideDuration={3000}
        onClose={handleNotice}
        message={noticeMsg}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setNotice(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}

const AppBarWrapper = ({ handleClickOpenWithFromClear }) => (
  <AppBar sx={{ position: 'relative' }}>
    <Toolbar>
      <Typography variant="h6" component="div">
        <Button color="inherit" onClick={handleClickOpenWithFromClear}>
          <MinimizeIcon />
        </Button>
      </Typography>
      <Typography sx={{ flex: 1 }} variant="h6" component="div">
        Update order item
      </Typography>
      <Button
        color="error"
        onClick={(e) => handleClickOpenWithFromClear(e, 'clearFrom')}
      >
        <CloseIcon />
      </Button>
    </Toolbar>
  </AppBar>
);
