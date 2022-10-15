import { useState, useEffect } from 'react';
import {
  LinearProgress,
  Box,
  Button,
  Typography,
  Checkbox,
} from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
import { OrderStatusField } from '../../arrayForms/orderFields';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import csses from './order.module.css';
import commonCsses from '../../styles/common.module.css';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
import OrderMeasuementUp from './OrderMeasuementUp';
import OrderBasic from './OrderBasic';
import SwipeableEdgeDrawer from '../../Drawer/SwipeableEdgeDrawer';
import OrderMeasuementDown from './OrderMeasuementDown';
import useGetQurey from './../../hooks/gql/useGetQurey';
import DesignView from './DesignView2';
import OrderPricing from './OrderPriceing';
import OrderDate from './OrderDate';
import OrderProduct from './OrderProduct';

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
  const [orderProduct, setOrderProduct] = useState({});

  const [type, setType] = useState({ type_one: true, type_two: false });
  const [gqlErrs, setGqlErrs] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm();
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

  console.dir(data, bug);
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

    if (Object.keys(type_one_check).length) {
      let up_item = {};
      total_up = quantity_up * price_up;
      up_item.order = orderProduct?.up || [];
      up_item.quantity = quantity_up;
      up_item.price = price_up;
      // up_item.designs = checkValuesAndErrors(designWithValue).values;
      up_item.measurements = type_one_check;
      // up_item.order_date = order_date;
      order_items.push(up_item);
    }
    if (Object.keys(type_two_check).length) {
      let down_item = {};
      total_down = quantity_down * price_down;
      down_item.quantity = quantity_down;
      total_down.price = price_down;
      total_down.measurement = type_two_check;
      total_down.order_date = order_date;
      order_items.push(total_down);
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
    // setGqlErrs({});
    // console.log(newOrderDates);

    // console.log(checkValuesAndErrors(designWithValue)?.values);

    // ;
    // createOrder({
    //   variables: { ...data, price: parseInt(data?.price) || 0 },
    // });
    createOrder({ variables: { order: newOrderDates } });
    // console.log(order_items);
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
                errors={errors}
                register={register}
                gqlErrs={gqlErrs}
                onFocus={onFocus}
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
                <OrderMeasuementUp
                  onFocus={onFocus}
                  gqlErrs={gqlErrs}
                  register={register}
                  errors={errors}
                />
                {Object.keys(designUpState)?.length && (
                  <DesignView
                    alldesigns={designUpState}
                    {...{ designWithValue, setDesignWithValue, designsHandler }}
                  />
                )}
                <OrderPricing
                  {...{
                    watch,
                    errors,
                    gqlErrs,
                    register,
                    prefix: 'up',
                    onFocus,
                    className: csses?.basicGrid,
                  }}
                />
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
                <OrderMeasuementDown
                  onFocus={onFocus}
                  gqlErrs={gqlErrs}
                  register={register}
                  errors={errors}
                />

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
