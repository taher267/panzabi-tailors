import { useState, useEffect } from 'react';
import {
  LinearProgress,
  Box,
  Button,
  Typography,
  Checkbox,
  Divider,
  CircularProgress,
} from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import Save from '@mui/icons-material/Save';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { OrderStatusField } from '../../arrayForms/orderFields';
import { useForm, useWatch, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import csses from './order.module.css';
import commonCsses from '../../styles/common.module.css';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
// import OrderMeasuementFields from './OrderMeasuementFields';
import OrderBasic from './OrderBasic';
// import SwipeableEdgeDrawer from '../../Drawer/SwipeableEdgeDrawer';
import useGetQurey from './../../hooks/gql/useGetQurey';
import removeGqlErrors from '../../utils/removeGqlErrors';
import clonning from '../../utils/clonning';
import designDevider from '../../utils/designDevider';
import CustomerInfoForOrder from './View/CustomerInfoForOrder';
import OrderItemCard from './OrderItemCard';
import PriceSummery from './PriceSummery';
import useAuth from '../../hooks/useAuth';
// import { useCallback } from 'react';
// import { debounce } from 'lodash';
import CheckingExistingOrderView from './View/CheckingExistingOrderView';
import AddOrderItemAlert from './View/SingleOrder/AddOrderItemAlert';
import clientQuery from '../../hooks/gql/usePromissQurey';
import SearchForCopy from './SearchForCopy';

const NOT_ANY_MEASUREMENT_CHECK = `Please check ☑️ at least one of the two measurement`;
const initPrice = { quantity: 0, price: 0, total: 0 };
const NewOrder = () => {
  const { user } = useAuth();
  const { customerID } = useParams();
  const navigate = useNavigate();
  const [desings, setDesigns] = useState({
    // up: {}, down: {}
  });
  const [existedOrderAddItemAlert, setExistedOrderAddItemAlert] = useState();
  const [searchOrder, setSearchOrder] = useState();

  const [all_designs, set_all_designs] = useState([]);
  const [all_products, set_all_products] = useState([]);
  const [all_measurements, set_all_measurements] = useState([]);

  const [thisCustomerOrders, setThisCustomerOrders] = useState({});
  const [searchItems, setSearchItems] = useState([]);
  const [loadingFetchingOrders, setLoadingFetchingOrders] = useState(false);
  const [checkForOrders, setCheckForOrders] = useState(false);

  const [designUpState, setDesignUpState] = useState({});
  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({});
  const [advanced, setAdvanced] = useState(0);
  const [designDownState, setDesignDownState] = useState({});
  const [designWithValue, setDesignWithValue] = useState({});
  const [prevOrderData, setPrevOrderData] = useState({});
  const [copyPrderProduct, setCopyOrderProduct] = useState({
    up: [],
    down: [],
  });
  // Copy item state
  const [copyDesigns, setCopyDesigns] = useState({});
  const [copyMeasurements, setCopyMeasurements] = useState({});
  const [orderProduct, setOrderProduct] = useState({
    up: copyPrderProduct['up'] || [],
    down: copyPrderProduct['down'] || [],
  });

  const [devideMeasurement, setDevideMeasurement] = useState({});
  const [pricingDetail, setPricingDetail] = useState({
    up: { ...initPrice },
    down: { ...initPrice },
    totalPrice: 0,
  });
  // for Graphql error state
  const [gqlErrs, setGqlErrs] = useState({});
  // React Hook form
  const {
    control,
    register,
    handleSubmit,
    setError,
    // resetField,
    watch,
    unregister,
    clearErrors,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      checkboxUp: false,
      checkboxDown: false,
      // item_add_in_existing_order: false,
    },
  });
  // New product add
  const {
    mutation: createOrder,
    processing,
    bug,
    data,
  } = useMutationFunc('NEW_ORDER', null, null, 'createOrder');
  //Add new order item
  const {
    mutation: addNewOrderItem,
    processing: itemLoading,
    bug: itemBug,
    data: newItemData,
  } = useMutationFunc('ADD_NEW_ORDER_ITEM', null, null, 'addNewOrderItem');

  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await clientQuery('SINGLE_ORDER_BASIC', {
          key: 'order_no',
          value: searchOrder,
        });
        setPrevOrderData(data?.getOrder || {});
      } catch (e) {
        setPrevOrderData({});
        console.log(e?.message);
      } finally {
        // setLoading(false);
      }
    };
    if (searchOrder) {
      fatch();
    }
  }, [searchOrder]);

  useEffect(() => {
    // /fetching All designs
    if (!all_designs?.length) {
      (async () => {
        try {
          const { data } = await clientQuery('SPECIFIC_ALL_DESIGNS');
          set_all_designs(data?.allDesigns || []);
        } catch (e) {
          set_all_designs([]);
          console.log(e?.message);
        }
      })();
    }
    //fetching All products
    if (!all_products?.length) {
      (async () => {
        try {
          const { data } = await clientQuery('PRODUCTS_NAME_ID_CAT');
          set_all_products(data?.allProducts || []);
        } catch (e) {
          set_all_products([]);
          console.log(e?.message);
        }
      })();
    }
    //Fetch all measurements
    if (!Object.keys(devideMeasurement || {})?.length) {
      //!all_measurements?.length
      (async () => {
        try {
          const { data } = await clientQuery('ALL_MEASUREMENTS', {
            key: 'status',
            value: 'ACTIVE',
          });
          // set_all_measurements(data?.allMeasurements || []);
          setDevideMeasurement(
            data?.allMeasurements?.reduce?.((a, c) => {
              if (c.template === 'template-01') {
                let up = clonning(a?.up || []);
                up.push(c);
                a = { ...a, up };
              } else {
                a = { ...a, down: [...(a?.down || []), c] };
              }
              return a;
            }, {}) || {}
          );
        } catch (e) {
          set_all_measurements([]);
          console.log(e?.message);
        }
      })();
    }
  }, []);

  useFieldArray({ control, name: 'down' });
  //Design 0ne /up
  const up = useWatch({
    name: 'up',
    control,
  });
  // console.log(bug);

  //Design 2 /down
  const down = useWatch({
    control,
    name: 'down',
  });

  //Measuement 0ne /up
  const up_muesurement = useWatch({
    name: 'measurements_up',
    control,
  });
  useEffect(() => {
    if (up_muesurement && !orderProduct?.up?.length) {
      return setError('up_products', {
        type: 'custom',
        message: `Product is Mandatory!`,
      });
    }
    clearErrors('up_products');
  }, [up_muesurement, orderProduct]);

  useEffect(() => {
    if (!Object.keys(desings)?.length && all_designs?.length) {
      setDesigns(designDevider(all_designs));
    }
  }, [all_designs]);
  //////////////////////////////////////////////////////SUBMIT DATA
  const onSubmit = (data) => {
    // console.log(data);
    // return;
    const {
      order_status,
      order_date,
      order_no,
      previous_order,
      delivery_date,
      item_add_in_existing_order,
      // ...measure1
    } = data;
    if (!data?.previous_order) delete data.previous_order;
    if (
      (previous_order || item_add_in_existing_order) &&
      !prevOrderData?.order_no
    ) {
      return setExistedOrderAddItemAlert({
        open: true,
        message: `Please verify your order id!`,
      });
    } else if (previous_order && !item_add_in_existing_order) {
      return setExistedOrderAddItemAlert({
        open: true,
        message: `Would you like to add order item in existd order? if yes, please ✅ check Items ad in existing order!`,
      });
    } else if (!previous_order && item_add_in_existing_order) {
      return setExistedOrderAddItemAlert({
        open: true,
        message: `Please verify your order number to fill up the previous order number field for include order items!`,
      });
    } else if (previous_order && order_no !== previous_order) {
      return setExistedOrderAddItemAlert({
        open: true,
        message: `Order no and previous order no mismatch ❌`,
      });
    }
    if (previous_order && item_add_in_existing_order) {
      if (
        !confirm(`This item will be include as existing order: ${order_no}`)
      ) {
        return;
      }
    }

    /**
     * TODO have to check both condation total price
     *have to check Delivery date
     * total qty both case
     * due check both case
     */
    const transport_charge = parseInt(data?.transport_charge) || 0;
    const discount = parseInt(data?.discount) || 0;
    const basic = {
      order_no, //
      previous_order,
      discount,
      customer: customerID,
      order_status, //
      delivery_date, //
    };
    const order_items = [];
    let total_up = 0;
    let total_down = 0;
    if (!data?.pricing) return;
    const [up, down] = data?.pricing;
    if (data?.checkboxUp) {
      let up_item = {};
      total_up = up.price * up.quantity;
      up_item.products =
        orderProduct?.up?.map(({ _id, name }) => ({ _id, name })) || [];
      up_item.quantity = up.quantity;
      up_item.price = up.price;
      up_item.connection = 'up';
      up_item.designs = designFiltering(data?.up);
      up_item.measurements = mapKeyValueToValues(
        clonning(data?.measurements_up)
      );
      up_item.order_date = order_date;
      up_item.user = user.id;
      order_items.push(up_item);
    }
    if (data?.checkboxDown) {
      let down_item = {};
      total_down = down.price * down.quantity;
      down_item.products =
        orderProduct?.down?.map(({ _id, name }) => ({ _id, name })) || [];
      down_item.quantity = down.quantity;
      down_item.price = down.price;
      down_item.connection = 'down';
      down_item.designs = designFiltering(data?.down);
      down_item.measurements = mapKeyValueToValues(
        clonning(data?.measurements_down)
      );
      down_item.order_date = order_date;
      down_item.user = user.id;
      order_items.push(down_item);
    }

    const { totalPrice, up: _up, down: _down } = pricingDetail;
    //Grand Total of price
    const GrandTotal = totalPrice + transport_charge;

    let due = GrandTotal - advanced;
    let totalQty =
      (parseInt(_up.quantity) || 0) + (parseInt(_down.quantity) || 0);
    // previous qty add to new total qty for new order item
    if (previous_order && item_add_in_existing_order) {
      totalQty += prevOrderData?.totalQty || 0;
    }
    // Basic order data
    const newOrderDates = {
      ...basic,
      due,
      totalQty,
      totalPrice: GrandTotal,
      advanced,
      order_items,
      transport_charge,
    };

    setGqlErrs({});
    // console.log(data);
    if (previous_order && item_add_in_existing_order) {
      delete newOrderDates.delivery_date;
      addNewOrderItem({
        variables: { _id: prevOrderData._id, newItem: newOrderDates },
      });
    } else {
      createOrder({ variables: { order: newOrderDates } });
    }
  };
  //Reset form
  useEffect(() => {
    if (data || newItemData) {
      reset();
      if (data?._id || prevOrderData?._id) {
        navigate(`/dashboard/order/${data?._id || prevOrderData?._id}`, {
          replace: true,
        });
      }
    }
  }, [data, newItemData]);
  const prev_order = watch('previous_order');
  useEffect(() => {
    if (prev_order) {
      setSearchOrder(prev_order);
    }
  }, [prev_order]);

  // console.log(errors);

  useEffect(() => {
    //     designUpState
    // designDownState
    if (
      !designUpState?.length &&
      all_designs &&
      !Object.keys(designUpState).length &&
      !Object.keys(designDownState).length
    ) {
      setDesignUpState({});
      setDesignDownState({});
      const modifyAllDesignsUpItems = all_designs?.reduce((a, c) => {
        const copy = { ...c };
        delete copy.__typename;
        if (copy?.type?.includes('1')) {
          a = DesingDivide(a, copy);
        }
        if (copy?.type?.includes('2')) {
          a = DesingDivide(a, copy, 'down');
        }
        return a;
      }, {});
      setDesignUpState({ ...modifyAllDesignsUpItems.up });
      setDesignDownState({ ...modifyAllDesignsUpItems.down });
    }
  }, [all_designs]);
  const checkboxUp = watch('checkboxUp');
  const checkboxDown = watch('checkboxDown');

  const upUnregiser = () => {
    unregister([
      `up`,
      `pricing.0.quantity`,
      `pricing.0.price`,
      'measurements_up',
    ]);
  };

  const downUnregiser = () => {
    unregister([
      `down`,
      `pricing.1.quantity`,
      `pricing.1.price`,
      'measurements_down',
    ]);
  };
  useEffect(() => {}, []);

  const priceing = useWatch({
    control,
    name: 'pricing',
  });
  //Pricing Details
  useEffect(() => {
    if (priceing) {
      const [up, down] = priceing;
      let totalPrice = 0;
      let upDetail = {};
      let downDetail = {};
      // setPricingDetail({});
      if (checkboxUp && up) {
        const res = calculation(up);
        upDetail = res;
        totalPrice = res.total;
      }

      if (checkboxDown && down) {
        const res = calculation(down);
        downDetail = res;
        totalPrice += res.total;
      }
      if (
        prevOrderData?.totalPrice &&
        prev_order &&
        watch('item_add_in_existing_order')
      ) {
        totalPrice += prevOrderData?.totalPrice;
      }
      setPricingDetail({ up: upDetail, down: downDetail, totalPrice });
    }
  }, [priceing]);
  // on focus remove graphql error
  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  const itemAddDiologHandler = (d) => {
    setExistedOrderAddItemAlert({});
  };
  // console.log(orderProduct);
  return (
    <AdminLayout>
      {processing && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {customerLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <AddOrderItemAlert
        {...{ existedOrderAddItemAlert, itemAddDiologHandler }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          border: '1px solid #ddd',
          padding: 2,
        }}
      >
        {customerID ? (
          <CustomerInfoForOrder
            {...{
              customerID,
              setCustomerLoading,
              setCustomerInfo,
              prevOrderData,
            }}
          />
        ) : (
          ''
        )}

        {Object.keys(prevOrderData || {})?.length ? (
          <CheckingExistingOrderView {...{ prevOrderData, customerInfo }} />
        ) : (
          ''
        )}
      </Box>
      {
        <Box>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Box sx={{}} className={csses.orderRequired}>
              <OrderBasic
                {...{
                  watch,
                  errors,
                  register,
                  gqlErrs,
                  onFocus,
                  setGqlErrs,
                  removeGqlErrors,
                }}
              />
            </Box>
            <select
              {...register('order_status', { required: true })}
              className={`${csses.orderStatus} ${
                gqlErrs?.order_status
                  ? commonCsses?.error
                  : errors?.order_status
                  ? commonCsses?.error
                  : ''
              }`}
            >
              <option value="">Select Status</option>
              {OrderStatusField?.options?.map?.((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {/* Measurement Type Start */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box sx={{ border: 1, padding: 1, borderRadius: 2 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h5">পাঞ্জাবী, জুব্বা</Typography>
                  <Typography>
                    <Checkbox
                      icon={
                        checkboxUp ? (
                          <CheckBoxIcon sx={{ color: '#009dea' }} />
                        ) : (
                          <CheckBoxOutlineBlank />
                        )
                      }
                      onClick={(e) => !e.target?.checked && upUnregiser()}
                      {...register('checkboxUp')}
                    />
                  </Typography>
                </Box>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                  architecto sunt neque in magnam quasi consequuntur
                </Typography>
              </Box>
              <Box sx={{ border: 1, padding: 1, borderRadius: 2 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h5">সালোয়ার, পাজামা</Typography>
                  <Typography>
                    <Checkbox
                      icon={
                        checkboxDown ? (
                          <CheckBoxIcon sx={{ color: '#009dea' }} />
                        ) : (
                          <CheckBoxOutlineBlank />
                        )
                      }
                      onClick={(e) => !e.target?.checked && downUnregiser()}
                      {...register('checkboxDown')}
                    />
                  </Typography>
                </Box>
                <Typography>
                  Facilis culpa. Voluptas, quia vero quam et provident voluptate
                  sint optio quos repudiandae illo?
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-evenly">
              <Typography variant="h6">সকল অর্ডার</Typography>
              <Typography>
                {loadingFetchingOrders ? (
                  <CircularProgress
                    sx={{
                      width: '20px !important',
                      height: '20px !important',
                    }}
                  />
                ) : (
                  <Checkbox
                    icon={
                      checkForOrders === true ? (
                        <CheckBoxIcon sx={{ color: '#009dea' }} />
                      ) : (
                        <CheckBoxOutlineBlank />
                      )
                    }
                    onClick={() => {
                      setCheckForOrders((p) => {
                        console.log(p);
                        return !p;
                      });
                    }}
                  />
                )}
              </Typography>
            </Box>
            {(checkForOrders && customerID && (
              <SearchForCopy
                {...{
                  customerID,
                  setLoadingFetchingOrders,
                  setThisCustomerOrders,
                  setCopyMeasurements,
                  setCopyOrderProduct,
                  thisCustomerOrders,
                  setOrderProduct,
                  setCopyDesigns,
                  setSearchItems,
                  searchItems,
                  setValue,
                }}
              />
            )) ||
              ''}

            {/* Measurement Type End */}
            {/* <Typography variant="h5">
              <span>
                {!checkboxUp && !checkboxDown ? (
                  <FormHelperText sx={{ color: 'red' }}>
                    {NOT_ANY_MEASUREMENT_CHECK}
                  </FormHelperText>
                ) : (
                  ''
                )}

                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={(e) => !e.target?.checked && upUnregiser()}
                      className={errors?.checkboxUp ? csses.CheckBox : ''}
                      {...register('checkboxUp')}
                    />
                  }
                  label="Measuremnt 01"
                />
              </span>
            </Typography> */}
            {checkboxUp && (
              <OrderItemCard
                {...{
                  //Common
                  errors,
                  register,
                  gqlErrs,
                  setGqlErrs,
                  onFocus,
                  removeGqlErrors,
                  //product
                  productLabel: 'পাঞ্জাবী, জুব্বা',
                  defaultProducts: copyPrderProduct?.up || [],
                  setOrderProduct,
                  prodType: 'up',
                  productType: 'type-1',
                  fieldName: 'up_products',
                  //Measurement
                  measurementPrefix: '_up',
                  measurementFields: devideMeasurement?.up || [],
                  measurementDefaultValues: copyMeasurements || {},
                  // Designs
                  desings: desings?.up || [],
                  designsDefaultValues: copyDesigns || {},
                  type: 'up',
                  watching: up,
                  //Pricing
                  productLen: orderProduct?.up?.length || 0,
                  products: [
                    ...all_products?.filter((p) => p.category === 'type-1'),
                  ],
                  total: pricingDetail?.up?.total || 0,
                  pricingKey: 0,
                }}
              />
            )}
            {(checkboxUp && checkboxDown && (
              <Divider sx={{ marginTop: 2, border: '2.5px solid #ddd' }} />
            )) ||
              ''}
            {(checkboxDown && (
              <OrderItemCard
                {...{
                  //Common
                  errors,
                  register,
                  gqlErrs,
                  setGqlErrs,
                  onFocus,
                  removeGqlErrors,
                  //product
                  productLabel: 'সালোয়ার, পাজামা',
                  setOrderProduct,
                  defaultProducts: copyPrderProduct?.down || [],
                  products: [
                    ...all_products?.filter((p) => p.category === 'type-2'),
                  ],
                  prodType: 'down',
                  fieldName: 'down_products',
                  //Measurement
                  measurementPrefix: '_down',
                  measurementFields: devideMeasurement?.down || [],
                  measurementDefaultValues: copyMeasurements || {},
                  // Designs
                  desings: desings?.down || [],
                  designsDefaultValues: copyDesigns || {},
                  type: 'down',
                  watching: down,
                  //Pricing
                  productLen: orderProduct?.down?.length || 0,
                  total: pricingDetail?.down?.total || 0,
                  pricingKey: 1,
                }}
              />
            )) ||
              ''}
            {((checkboxUp || checkboxDown) && (
              <>
                <PriceSummery {...{ pricingDetail, advanced, setAdvanced }} />
                <Button
                  sx={{ marginTop: 2 }}
                  disabled={
                    processing ||
                    Object.keys(gqlErrs).length > 0 ||
                    Object.keys(errors).length > 0
                  }
                  variant="contained"
                  fullWidth
                  endIcon={<Save />}
                  type="submit"
                >
                  Add Order
                </Button>
              </>
            )) ||
              ''}
          </form>
        </Box>
      }
    </AdminLayout>
  );
};
export default NewOrder;
export function DesingDivide(prev, newData, where = 'up') {
  let data = {
    ...prev,
    [where]: {
      ...prev?.[where],
      [newData._id]: {
        ...newData,
        designs: newData?.designs?.map((des) => ({
          ...des,
          desc: '',
          isChecked: false,
        })),
      },
    },
  };
  return data;
}

export function checkValuesAndErrors(data) {
  let errors = {};
  let values = {};
  for (const i of Object.keys(data)) {
    let items = data[i] || {};
    let itemsArr = Object.keys(items);
    for (const j of itemsArr) {
      let { desc, isChecked } = items[j];
      if (isChecked) {
        //////////////////////////////
        // let prevObj = {
        //   group: j,
        //   items: { ...values[i], [items?.[i]?.[j]]: items?.[j]?.desc },
        // };
        // console.log(values.includes());
        // values = [...values, prevObj];
        //////////////////////////////
        values = {
          ...values,
          [i]: { ...values[i], [j]: { ...items?.[j] } },
        };
      } else if (desc && !isChecked) {
        errors = {
          ...errors,
          [i]: { ...errors[i], [j]: `please Checked` },
        };
      }
    }
  }

  // console.log(errors, values);
  // object to array
  const newArr = [];
  const obj = Object.keys(values);
  if (obj?.length) {
    for (const key of obj) {
      let group = key;
      let items = [];
      let designs = values?.[key] || {};
      for (const k of Object.keys(designs)) {
        items.push({ dsn_id: k, desc: designs?.[k]?.desc });
      }
      newArr.push({ group, items });
    }
    // console.log(newArr, 'newArr');
  }
  return { errors, values: newArr };
}

export function fetchMeasurement(data, kyes = []) {
  const filtered = [];
  for (const key of kyes) {
    if (data?.[key]?.length) {
      filtered.push({ msr_id: key, size: data[key] });
    }
  }
  return filtered;
}

const mapKeyValueToValues = (data) => {
  const newObj = [];
  for (const key of Object.keys(data)) {
    const { size, label } = data[key];
    if (size?.trim?.()) newObj.push({ msr_id: key, size, label });
  }
  return newObj;
};

const designFiltering = (data) =>
  data.reduce((a, c) => {
    const obj = objToArray(c);
    if (obj) a.push(obj);
    return a;
  }, []);

const objToArray = (data) => {
  let result;
  const group = data?.group;
  if (group) {
    const cloneData = clonning(data);
    const slicing = Object.keys(cloneData)?.slice?.(0, -1);
    const items = [];
    for (const item of slicing) {
      const { isCheck, ...rest } = cloneData[item];
      if (isCheck) items.push(rest);
    }
    if (items?.length) result = { group, items };
  }
  return result;
};

const calculation = (data) => {
  const { price, quantity } = data;
  let res = {};
  const qty = quantity.toString() === 'NaN' ? 0 : quantity;
  const pice = price.toString() === 'NaN' ? 0 : price;
  res.price = pice;
  res.quantity = qty;
  res.total = qty * pice;
  return res;
};
