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
  const [type, setType] = useState({ type_one: true, type_two: false });
  const [gqlErrs, setGqlErrs] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm();

  const {
    mutation: createOrder,
    processing,
    bug,
  } = useMutationFunc('NEW_ORDER');
  const { data: all_designs } = useGetQurey('ALL_DESIGNS', null, 'allDesigns');
  //   console.dir(data);
  //   console.dir('validErrs', validErrs);
  const onSubmit = (data) => {
    const {
      order_status,
      order_date,
      order_no,
      previous_order,
      delivery_date, //
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

    const type_one = InitFields.type_one;
    const type_one_vals = type?.type_one
      ? fetchMeasurement(data, InitFields.type_one)
      : {};
    const type_two = InitFields.type_two;
    const type_two_vals = type?.type_two
      ? fetchMeasurement(data, InitFields.type_two)
      : {};
    const basic = {
      order_no, //
      previous_order, //
      // quantity,
      // totalPrice,
      // discunt,
      // advanced,
      // due,
      // transport_charge,
      // user,
      order_status, //
      // order_items,
      delivery_date, //
    };
    const order_items = [];
    // order_items:[
    //   {
    //     measurements:type_one_vals
    //   }
    // ]
    if (Object.keys(type_one_vals).length) {
      order_items.push(type_one_vals);
    }
    if (Object.keys(type_two_vals).length) {
      order_items.push(type_two_vals);
    }
    const newOrderDates = {
      ...basic,
      order_items,
    };
    // setGqlErrs({});
    console.log(newOrderDates);
    // console.log(designWithValue);

    // checkValuesAndErrors(designWithValue);
    // createOrder({
    //   variables: { ...data, price: parseInt(data?.price) || 0 },
    // });
    // createMeasurement({ variables: { ...data } });
  };
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
              </>
            )}
            <OrderPricing
              {...{
                errors,
                gqlErrs,
                register,
                prefix: 'up',
                onFocus,
                className: csses?.basicGrid,
              }}
            />
            <Typography variant="h4">
              Measurement 02
              <Checkbox
                name="type_two"
                onChange={typeHandler}
                checked={type.type_two}
              />
            </Typography>
            {type?.type_two && (
              <OrderMeasuementDown
                onFocus={onFocus}
                gqlErrs={gqlErrs}
                register={register}
                errors={errors}
              />
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
      if (desc && isChecked) {
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
  return [errors, values];
}

export function fetchMeasurement(data, kyes = []) {
  const filtered = {};
  for (const v of kyes) {
    if (data?.[v]?.length) {
      filtered[v] = data[v];
    }
  }
  return filtered;
}
