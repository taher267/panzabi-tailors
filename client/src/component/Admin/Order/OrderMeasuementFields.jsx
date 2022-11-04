import { TextField } from '@mui/material';
import csses from './order.module.css';
import Field from '../../ui/Action/Field';

// import { useForm } from 'react-hook-form';
const OrderMeasuementFields = ({ fields, prefix, ...rest1 }) => {
  return (
    <div className={csses.orderMeasuementFields}>
      {fields?.map((field) => {
        let { name, _id, ...rest } = field;
        return (
          <Field
            key={_id}
            {...{
              name: 'measurements' + (prefix || '') + '.' + _id,
              ...rest1,
              ...rest,
            }}
          />
        );
      })}
    </div>
  );
};

export default OrderMeasuementFields;
