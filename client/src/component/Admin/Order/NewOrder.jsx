import { useState, useEffect } from 'react';
import {
  LinearProgress,
  Box,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
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
// import DesignView from './DesignView2';
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

const InitFields = {
  type_one: [
    'long',
    'body',
    'body_loose',
    'belly',
    'belly_loose',
    'sholder',
    'sleeve',
    'coller',
    'sleeve_cuff',
    'aditional',
  ],
  type_two: [
    'length',
    'anklet_cuff',
    'waist_to_crotch',
    'waist',
    'thigh',
    'hips',
  ],
};
const NOT_ANY_MEASUREMENT_CHECK = `Please check ☑️ at least one of the two measurement`;
const initPrice = { quantity: 0, price: 0, total: 0 };
const NewOrder = () => {
  const { user } = useAuth();
  const { customerID } = useParams();
  const navigate = useNavigate();
  const [desings, setDesigns] = useState({
    // up: {}, down: {}
  });
  // const [basicOrder, setBasicOrder] = useState({});
  const [existedOrderAddItemAlert, setExistedOrderAddItemAlert] = useState();
  const [searchOrder, setSearchOrder] = useState();
  const [designUpState, setDesignUpState] = useState({});
  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({});
  const [advanced, setAdvanced] = useState(0);
  const [designDownState, setDesignDownState] = useState({});
  const [designWithValue, setDesignWithValue] = useState({});
  const [orderProduct, setOrderProduct] = useState({ up: [], down: [] });
  const [devideMeasurement, setDevideMeasurement] = useState({});
  const [pricingDetail, setPricingDetail] = useState({
    up: { ...initPrice },
    down: { ...initPrice },
    totalPrice: 0,
  });

  const [gqlErrs, setGqlErrs] = useState({});
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
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      checkboxUp: false,
      checkboxDown: false,
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
  const {
    data: prevOrderData,
    loading,
    error,
  } = useGetQurey(
    'SINGLE_ORDER_BASIC',
    { key: 'order_no', value: searchOrder },
    'getOrder'
  );
  const { data: all_designs } = useGetQurey(
    'SPECIFIC_ALL_DESIGNS',
    null,
    'allDesigns'
  );
  const { data: all_products } = useGetQurey(
    'PRODUCTS_NAME_ID_CAT',
    null,
    'allProducts'
  );
  // console.log(data);
  const { data: all_measurements } = useGetQurey(
    'ALL_MEASUREMENTS',
    // { key: 'status:ACTIVE,template:template-01' },
    { key: 'status', value: 'ACTIVE' },
    'allMeasurements'
  );
  useEffect(() => {
    if (
      all_measurements &&
      all_measurements?.length &&
      !Object.keys(devideMeasurement).length
    ) {
      const datas = all_measurements?.reduce((a, c) => {
        if (c.template === 'template-01') {
          let up = clonning(a?.up || []);
          up.push(c);
          a = { ...a, up };
        } else {
          a = { ...a, down: [...(a?.down || []), c] };
        }
        return a;
      }, {});
      // console.log(datas);
      setDevideMeasurement(datas);
    }
  }, [all_measurements]);

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
  // console.log(prevOrderData);
  //////////////////////////////////////////////////////SUBMIT DATA
  const onSubmit = (data) => {
    const {
      order_status,
      order_date,
      order_no,
      previous_order,
      delivery_date,
      item_add_in_existing_order,
      // ...measure1
    } = data;
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
    } else if (order_no !== previous_order) {
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
      up_item.products = orderProduct?.up || [];
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
      down_item.products = orderProduct?.down || [];
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
    if (previous_order && item_add_in_existing_order) {
      delete newOrderDates.delivery_date;
      // console.log(newOrderDates);
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
    }
  }, [data, newItemData]);

  const prev_order = watch('previous_order');
  useEffect(() => {
    if (prev_order) {
      setSearchOrder(prev_order);
    }
  }, [prev_order]);

  // console.log(prev, 'prev_order');

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

  const priceing = useWatch({
    control,
    name: 'pricing',
  });

  // console.log(pricingDetail);
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

  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  // const order_number = watch('order_no');
  // const prev_order_number = watch('previous_order');
  // useEffect(() => {
  //   if (order_number){};
  // }, [order_number, prev_order_number]);
  const designsHandler = (
    { target: { name, value, checked } },
    items_id,
    is
  ) => {
    // console.log(name, value, checked, items_id, is);
    setDesignWithValue((p) => ({
      ...p,
      [items_id]: {
        ...p[items_id],
        [name]: {
          desc: is ? p[items_id]?.[name]?.desc || '' : value,
          isChecked: is ? checked : p?.[items_id]?.[name]?.isChecked || true,
        },
      },
    }));
  };
  const itemAddDiologHandler = (d) => {
    setExistedOrderAddItemAlert({});
  };
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

        {prevOrderData ? (
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

            <Typography variant="h5">
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
            </Typography>
            {checkboxUp && (
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
                  productType: 'type-1',
                  fieldName: 'up_products',
                  //Measurement
                  measurementPrefix: '_up',
                  measurementFields: devideMeasurement?.up || [],
                  desings: desings?.up || [],
                  type: 'up',
                  watching: up,
                  //Pricing
                  productLen: orderProduct?.up?.length || 0,
                  total: pricingDetail?.up?.total || 0,
                  pricingKey: 0,
                }}
              />
            )}

            <Typography variant="h5">
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
                      onClick={(e) => !e.target?.checked && downUnregiser()}
                      className={errors?.checkboxDown ? csses.CheckBox : ''}
                      {...register('checkboxDown')}
                    />
                  }
                  label="Measuremnt 02"
                />
              </span>
            </Typography>
            {checkboxDown && (
              <>
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
                    productType: 'type-2',
                    fieldName: 'down_products',
                    //Measurement
                    measurementPrefix: '_down',
                    measurementFields: devideMeasurement?.down || [],
                    desings: desings?.down || [],
                    type: 'down',
                    watching: down,
                    //Pricing
                    productLen: orderProduct?.down?.length || 0,
                    total: pricingDetail?.down?.total || 0,
                    pricingKey: 1,
                  }}
                />
              </>
            )}
            <PriceSummery {...{ pricingDetail, advanced, setAdvanced }} />
            <Button
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
