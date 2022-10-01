import { Fragment, useState, useEffect } from 'react';
import { LinearProgress, Box, TextField, Button, Select } from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
import { errorFormat } from '../../utils/errorConv';
import {
  orderFields,
  orderMeasurementFields,
  OrderStatusField,
} from '../../arrayForms/orderForm';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import csses from './order.module.css';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
import OrderMeasuement from './OrderMeasuement';
import OrderBasic from './OrderBasic';
const valuesInit = { name: '', description: '', price: '', category: '' };

const NewOrder = () => {
  const navigate = useNavigate();
  const [gqlErrs, setGqlErrs] = useState({});
  // const [inputMeasuermentFields, setInputMeasuermentFields] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    mutation: createOrder,
    data,
    processing,
    bug,
  } = useMutationFunc('NEW_ORDER');

  //   console.dir(data);
  //   console.dir('validErrs', validErrs);
  const onSubmit = (data) => {
    setGqlErrs({});
    console.log(data);
    // createOrder({
    //   variables: { ...data, price: parseInt(data?.price) || 0 },
    // });
    // createMeasurement({ variables: { ...data } });
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

  return (
    <AdminLayout>
      {processing && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
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
            <select
              {...register('category', { required: true })}
              defaultValue={1}
              style={{
                width: '100%',
                padding: '10px',
                background: 'transparent',
                color: '#000',
                marginBottom: '5px',
                border: 'none',
                borderBottom: '1px solid #000',
              }}
            >
              <option value="">Select</option>
              {OrderStatusField?.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <OrderMeasuement
              onFocus={onFocus}
              gqlErrs={gqlErrs}
              register={register}
              errors={errors}
            />
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
          {/* <form onSubmit={handleSubmit(measuementSubmit)}>
            <OrderMeasuement
              fields={orderMeasurementFields}
              onFocus={onFocus}
              gqlErrs={gqlErrs}
              register={register}
              errors={errors}
            />
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
              Add Measurement
            </Button>
          </form> */}
        </div>
      }
    </AdminLayout>
  );
};

export default NewOrder;
