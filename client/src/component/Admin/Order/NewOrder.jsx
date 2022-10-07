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
  const [designState, setDesignState] = useState({});
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
    setGqlErrs({});
    // console.log(data);
    console.log(designWithValue);
    // createOrder({
    //   variables: { ...data, price: parseInt(data?.price) || 0 },
    // });
    // createMeasurement({ variables: { ...data } });
  };
  useEffect(() => {
    if (!designState?.length && all_designs) {
      setDesignState({});
      const modifyAllDesignsItems = all_designs?.reduce((a, c) => {
        const copy = { ...c };
        delete copy.__typename;
        a = {
          ...a,
          [copy._id]: {
            ...copy,
            designs: copy?.designs?.map((des) => ({
              ...des,
              desc: '',
              isChecked: false,
            })),
          },
        };
        return a;
      }, {});
      setDesignState({ ...modifyAllDesignsItems });
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
              <OrderMeasuementUp
                onFocus={onFocus}
                gqlErrs={gqlErrs}
                register={register}
                errors={errors}
              />
            )}
            {Object.keys(designState)?.length && (
              <DesignView
                alldesigns={designState}
                {...{ designWithValue, setDesignWithValue, designsHandler }}
              />
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

// useEffect(() => {
//   if (!designState?.length && all_designs) {
//     setDesignState({});
//     const modifyAllDesignsItems = all_designs?.reduce((a, c) => {
//       const copy = { ...c };
//       delete copy.__typename;
//       a = [
//         ...a,
//         {
//           ...copy,
//           designs: copy?.designs?.map((des) => ({
//             ...des,
//             desc: '',
//             isChecked: false,
//           })),
//         },
//       ];
//       return a;
//     }, []);
//     setDesignState([...modifyAllDesignsItems]);
//   }
//   // console.log(all_designs);
// }, [all_designs]);
