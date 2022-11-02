import { useState, useEffect } from 'react';
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
import useGetQurey from '../../hooks/gql/useGetQurey';
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
  const [designDownState, setDesignDownState] = useState({});
  const [designWithValue, setDesignWithValue] = useState({});
  const [orderProduct, setOrderProduct] = useState({ up: [], down: [] });
  const [devideMeasurement, setDevideMeasurement] = useState({});

  const [type, setType] = useState({ type_one: true, type_two: false });
  const [gqlErrs, setGqlErrs] = useState({});
  const {
    control,
    register,
    handleSubmit,
    setError,
    resetField,
    watch,
    unregister,
    clearErrors,
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
  console.log(data);
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

  //////////////////////////////////////////////////////SUBMIT DATA
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
    const [up, down] = data?.pricing;
    // console.log(type);
    if (data?.checkboxUp) {
      let up_item = {};
      total_up = up.price * up.quantity;
      up_item.products = orderProduct?.up || [];
      up_item.quantity = up.quantity;
      up_item.price = up.price;
      up_item.designs = checkValuesAndErrors(designWithValue).values;
      up_item.measurements = mapKeyValueToValues(
        clonning(data?.measurements_up)
      );

      up_item.order_date = order_date;
      order_items.push(up_item);
    }
    // Object.keys(type_two_check).length
    if (data?.checkboxDown) {
      let down_item = {};
      total_down = down.price * down.quantity;
      down_item.products = orderProduct?.down || [];
      down_item.quantity = down.quantity;
      down_item.price = down.price;
      down_item.measurements = mapKeyValueToValues(
        clonning(data?.measurements_down)
      );
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
    createOrder({ variables: { order: newOrderDates } });
    // console.log(newOrderDates);
    // console.log(JSON.stringify(newOrderDates));
  };

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

  useEffect(() => {
    if (!checkboxUp) {
      unregister([`pricing.0.quantity`, `pricing.0.price`, 'measurements_up']);
    }
  }, [unregister, checkboxUp]);

  const checkboxDown = watch('checkboxDown');

  useEffect(() => {
    if (!checkboxDown) {
      unregister([
        `pricing.1.quantity`,
        `pricing.1.price`,
        'measurements_down',
      ]);
    }
  }, [unregister, checkboxDown]);

  useEffect(() => {
    // (async () => {
    //   console.log(await PriceCard({ control }));
    // })();
  }, []);

  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  // if there is no open two measurement between one  set Error
  useEffect(() => {
    if (!checkboxUp && !checkboxDown) {
      setError('checkboxUp', {
        type: 'custom',
        message: 'Please check ☑️ at least one of the two measurement',
      });
      setError('checkboxDown', {
        type: 'custom',
        message: 'Please check ☑️ at least one of the two measurement',
      });
    } else {
      clearErrors(['checkboxUp', 'checkboxDown']);
    }
  }, [checkboxUp, checkboxDown]);
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
            <Typography variant="h5" color={errors?.checkboxUp ? 'error' : ''}>
              Measurement 01
              <span
                style={{ fontSize: 14, position: 'absolute', width: '100%' }}
              >
                {errors?.checkboxUp?.message}
              </span>
              <span style={{ position: 'relative' }}>
                <Checkbox
                  className={errors?.checkboxUp ? csses.CheckBox : ''}
                  {...register('checkboxUp')}
                />
              </span>
            </Typography>
            {checkboxUp && (
              <>
                <Typography sx={{ margin: '10px 0' }}>পণ্য</Typography>
                {all_products && (
                  <OrderProduct
                    selectedProducts={(_, v) => {
                      // orderProductHandle(v, 'up')
                      setOrderProduct((p) => {
                        let up = v?.reduce((a, c) => [...a, c?._id], []);
                        // console.log(up);
                        return {
                          ...p,
                          up,
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

                <Typography>PRICE:</Typography>
                <div style={{ display: 'flex' }}>
                  <TextField
                    error={errors?.pricing?.[0]?.quantity ? true : false}
                    label="Quantity"
                    type="number"
                    {...register(`pricing.${0}.quantity`, {
                      valueAsNumber: true,
                      required: true,
                    })}
                  />
                  <TextField
                    error={errors?.pricing?.[0]?.price ? true : false}
                    label="Quantity"
                    type="number"
                    {...register(`pricing.${0}.price`, {
                      valueAsNumber: true,
                      required: true,
                    })}
                  />
                  {<Box>One</Box>}
                </div>
              </>
            )}
            <Typography
              variant="h5"
              color={errors?.checkboxDown ? 'error' : ''}
            >
              Measurement 02
              <span
                style={{ fontSize: 14, position: 'absolute', width: '100%' }}
              >
                {errors?.checkboxDown?.message}
              </span>
              <span style={{ position: 'relative' }}>
                <Checkbox
                  className={errors?.checkboxDown ? csses.CheckBox : ''}
                  {...register('checkboxDown')}
                />
              </span>
            </Typography>
            {checkboxDown && (
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
                    // selectedProducts={(_, v) => orderProductHandle(v, 'down')}
                    selectedProducts={(_, v) => {
                      setOrderProduct((p) => {
                        return {
                          ...p,
                          down: v?.reduce((a, c) => [...a, c?._id], []),
                        };

                        // let down;
                      });
                    }}
                    products={all_products?.filter(
                      (p) => p.category === 'type-2'
                    )}
                  />
                )}

                {Object.keys(designDownState)?.length && (
                  <DesignView
                    alldesigns={designDownState}
                    {...{ designWithValue, setDesignWithValue, designsHandler }}
                  />
                )}
                <Typography>PRICE:</Typography>
                <div style={{ display: 'flex' }}>
                  <TextField
                    error={errors?.pricing?.[1]?.quantity ? true : false}
                    label="Quantity"
                    type="number"
                    {...register(`pricing.${1}.quantity`, {
                      valueAsNumber: true,
                      required: true,
                    })}
                  />
                  <TextField
                    error={errors?.pricing?.[1]?.price ? true : false}
                    label="Quantity"
                    type="number"
                    {...register(`pricing.${1}.price`, {
                      valueAsNumber: true,
                      required: true,
                    })}
                  />
                  {/* <Box>{PriceCard({ control, select: 'prices' })?.[1]}</Box> */}
                </div>
              </>
            )}

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

const PriceCard = ({ control, select }) => {
  const cartValue = useWatch({
    control,
    name: 'pricing',
  });
  if (select) return getTotal(cartValue)?.[select];
  return getTotal(cartValue);
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

const mapKeyValueToValues = (data) => {
  const newObj = [];
  for (const key of Object.keys(data)) {
    newObj.push({ msr_id: key, size: data[key] });
  }
  return newObj;
};
