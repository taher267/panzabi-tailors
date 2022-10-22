import { useState, useEffect, Component } from 'react';
import {
  LinearProgress,
  Box,
  Button,
  Typography,
  Checkbox,
  TextField,
} from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
import { OrderStatusField } from '../../arrayForms/orderFields';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import csses from './order.module.css';
import commonCsses from '../../styles/common.module.css';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
import OrderMeasuementField from './OrderMeasuementFields';
import OrderBasic from './OrderBasic';
import SwipeableEdgeDrawer from '../../Drawer/SwipeableEdgeDrawer';
import useGetQurey from './../../hooks/gql/useGetQurey';
import DesignView from './DesignView2';
import OrderPricing from './OrderPriceing';
import OrderDate from './OrderDate';
import OrderProduct from './OrderProduct';
import removeGqlErrors from '../../utils/removeGqlErrors';
import clonning from '../../utils/clonning';
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

const NewOrder = () => {
  const navigate = useNavigate();
  const [designUpState, setDesignUpState] = useState({});
  const [designWithValue, setDesignWithValue] = useState({});
  const [orderProduct, setOrderProduct] = useState({ up: [], down: [] });
  const [devideMeasurement, setDevideMeasurement] = useState({});

  const [type, setType] = useState({ type_one: true, type_two: false });
  const [gqlErrs, setGqlErrs] = useState({});
  const {
    control,
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'all',
  });
  // New product add
  const {
    mutation: createOrder,
    processing,
    bug,
    data,
  } = useMutationFunc('NEW_ORDER', null, null, 'createOrder');
  const { data: all_designs } = useGetQurey('ALL_DESIGNS', null, 'allDesigns');
  const { data: all_products } = useGetQurey(
    'PRODUCTS_NAME_ID_CAT',
    null,
    'allProducts'
  );

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
  const Priceing = () =>
    useWatch({
      control,
      name: 'pricing',
    });
  // console.dir(data);
  //   console.dir('validErrs', validErrs);
  const onSubmit = (data) => {
    const {
      order_status,
      order_date,
      order_no,
      previous_order,
      delivery_date, //
      // discount,
      // long,
      // body,
      // body_loose,
      // belly,
      // belly_loose,
      // sholder,
      // sleeve,
      // coller,
      // sleeve_cuff,
      ...measure1
    } = data;

    const advanced = parseInt(data?.advanced) || 0;
    const quantity_up = parseInt(data?.quantity_up) || 0;
    const price_up = parseInt(data?.price_up) || 0;
    const quantity_down = parseInt(data?.quantity_down) || 0;
    const price_down = parseInt(data?.price_down) || 0;
    const transport_charge = parseInt(data?.transport_charge) || 0;
    const discount = parseInt(data?.discount) || 0;
    const type_one = InitFields.type_one;
    const type_one_check = type?.type_one
      ? fetchMeasurement(data, InitFields.type_one)
      : {};
    const type_two = InitFields.type_two;
    const type_two_check = type?.type_two
      ? fetchMeasurement(data, InitFields.type_two)
      : {};
    const basic = {
      order_no, //
      previous_order,
      discount,
      // user,
      order_status, //
      // order_items,
      delivery_date, //
    };
    const order_items = [];
    let total_up = 0;
    let total_down = 0;

    // console.log(type);
    if (type?.type_one) {
      let up_item = {};
      total_up = quantity_up * price_up;
      up_item.products = orderProduct?.up || [];
      up_item.quantity = quantity_up;
      up_item.price = price_up;
      up_item.designs = checkValuesAndErrors(designWithValue).values;
      up_item.measurements = data?.measurements_up;
      up_item.order_date = order_date;
      order_items.push(up_item);
    }
    // Object.keys(type_two_check).length
    if (type?.type_two) {
      let down_item = {};
      total_down = quantity_down * price_down;
      down_item.quantity = quantity_down;
      down_item.price = price_down;
      down_item.measurements = data?.measurements_down;
      down_item.order_date = order_date;
      order_items.push(down_item);
    }
    const totalPrice = total_up + total_down + transport_charge;
    let due = totalPrice - advanced;
    const newOrderDates = {
      ...basic,
      due,
      totalQty: quantity_up + quantity_down,
      totalPrice,
      advanced,
      order_items,
      transport_charge,
    };
    setGqlErrs({});

    // ;
    // createOrder({
    //   variables: { ...data, price: parseInt(data?.price) || 0 },
    // });
    // createOrder({ variables: { order: newOrderDates } });
    console.log(newOrderDates);
    // console.log(JSON.stringify(newOrderDates));
  };
  const orderProductHandle = (v, type) => {};
  useEffect(() => {
    if (!designUpState?.length && all_designs) {
      setDesignUpState({});
      const modifyAllDesignsUpItems = all_designs?.reduce((a, c) => {
        const copy = { ...c };
        delete copy.__typename;
        // console.log(copy?.type?.includes('1'));
        if (copy?.type?.includes('1')) {
          a = DesingDivide(a, copy);
        }
        // if (copy?.type?.includes('2')) {
        //   a = DesingDivide(a, copy, 'down');
        // }
        return a;
      }, {});
      setDesignUpState({ ...modifyAllDesignsUpItems.up });
    }
    // console.log(all_designs);
  }, [all_designs]);

  const typeHandler = ({ target: { name, checked } }) => {
    setType((p) => ({ ...p, [name]: checked }));
    if (!checked) {
      for (const im of InitFields[name]) {
        resetField(im);
      }
    }
  };
  const measuementSubmit = (data) => {
    setGqlErrs({});
    console.log(data);
    // createOrder({
    //   variables: { ...data, price: parseInt(data?.price) || 0 },
    // });
    // createMeasurement({ variables: { ...data } });
  };

  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };

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
  return (
    <AdminLayout>
      {processing && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {/* <SwipeableEdgeDrawer data={watch} /> */}
      {/* <OrderDate /> */}

      {
        <div>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className={csses.orderRequired}>
              <OrderBasic
                {...{
                  errors,
                  register,
                  gqlErrs,
                  onFocus,
                  setGqlErrs,
                  removeGqlErrors,
                }}
              />
            </div>
            <fieldset
              style={{ border: 0 }}
              className={
                gqlErrs?.order_status
                  ? commonCsses?.error
                  : errors?.order_status
                  ? commonCsses?.error
                  : ''
              }
            >
              <legend>{OrderStatusField?.label}</legend>
              <select
                {...register('order_status', { required: true })}
                defaultValue={1}
                className={csses.orderStatus}
              >
                <option value="">Select Status</option>
                {OrderStatusField?.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <p className={commonCsses?.errMsg}>
                {gqlErrs?.order_status
                  ? gqlErrs?.order_status
                  : errors?.order_status
                  ? errors?.order_status?.message ||
                    OrderStatusField?.defaultError
                  : ''}
              </p>
            </fieldset>
            <Typography variant="h4">
              Measurement 01
              <Checkbox
                name="type_one"
                onChange={typeHandler}
                checked={type?.type_one}
              />
            </Typography>
            {type?.type_one && (
              <>
                <Typography sx={{ margin: '10px 0' }}>পণ্য</Typography>
                {all_products && (
                  <OrderProduct
                    selectedProducts={(_, v) => {
                      // orderProductHandle(v, 'up')
                      setOrderProduct((p) => {
                        return {
                          ...p,
                          up: v?.reduce((a, c) => {
                            return [...a, c?._id];
                          }, []),
                        };

                        // let down;
                      });
                    }}
                    products={all_products?.filter(
                      (p) => p.category === 'type-1'
                    )}
                  />
                )}
                <Typography sx={{ margin: '10px 0' }}>পরিমাপ</Typography>
                {devideMeasurement?.up?.length && (
                  <OrderMeasuementField
                    {...{
                      onFocus,
                      gqlErrs,
                      register,
                      errors,
                      setGqlErrs,
                      prefix: '_up',
                      removeGqlErrors,
                      fields: devideMeasurement.up,
                    }}
                  />
                )}
                {Object.keys(designUpState)?.length && (
                  <DesignView
                    alldesigns={designUpState}
                    {...{ designWithValue, setDesignWithValue, designsHandler }}
                  />
                )}
                {/* <OrderPricing
                  {...{
                    watch,
                    errors,
                    gqlErrs,
                    register,
                    prefix: 'up',
                    onFocus,
                    className: csses?.basicGrid,
                  }}
                /> */}
              </>
            )}
            <Typography variant="h4">
              Measurement 02
              <Checkbox
                name="type_two"
                onChange={typeHandler}
                checked={type.type_two}
              />
            </Typography>
            {type?.type_two && (
              <>
                {devideMeasurement?.down?.length && (
                  <OrderMeasuementField
                    {...{
                      onFocus,
                      gqlErrs,
                      register,
                      errors,
                      setGqlErrs,
                      prefix: '_down',
                      removeGqlErrors,
                      fields: devideMeasurement.down,
                    }}
                  />
                )}

                {all_products && (
                  <OrderProduct
                    selectedProducts={(_, v) => orderProductHandle(v, 'down')}
                    products={all_products?.filter(
                      (p) => p.category === 'type-2'
                    )}
                  />
                )}
              </>
            )}
            <div style={{ display: 'flex' }}>
              <TextField
                label="Quantity"
                type="number"
                {...register(`pricing.${0}.quantity`, {
                  valueAsNumber: true,
                  required: true,
                })}
              />
              <TextField
                label="Quantity"
                type="number"
                {...register(`pricing.${0}.price`, {
                  valueAsNumber: true,
                  required: true,
                })}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <TextField
                label="Quantiry"
                type="number"
                {...register(`pricing.${1}.quantity`, {
                  valueAsNumber: true,
                  required: true,
                })}
              />

              <TextField
                label="Price"
                type="number"
                {...register(`pricing.${1}.price`, {
                  valueAsNumber: true,
                  required: true,
                })}
              />
              {console.log(PriceCard({ control, select: 'prices' }))}
              {/* <PriceCard {...{ control, select: 'prices' }} /> */}
            </div>
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
        </div>
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

export const priceSummary = () => {
  const totalPrice = 0;
};

const PriceCard = ({ control, select = 'total', component, select2 }) => {
  const cartValue = useWatch({
    control,
    name: 'pricing',
  });

  return getTotal(cartValue)?.[select];
  // return <p>{JSON.stringify(getTotal(cartValue)?.[select])}</p>;
};

const getTotal = (payload) => {
  let total = 0;
  let prices = [];
  for (const item of payload || []) {
    const { quantity, price } = item;
    const sum = (quantity || 0) * (price || 0);
    prices.push(sum);
    total += sum;
  }
  const newPrices = {};
  for (const iter in prices) {
    // const {}
    newPrices[iter] = prices[iter];
  }
  // console.log();
  return { total, prices: newPrices };
};
