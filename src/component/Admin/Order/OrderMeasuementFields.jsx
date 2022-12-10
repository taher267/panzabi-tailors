import { TextField } from '@mui/material';
import csses from './order.module.css';
import Field from '../../ui/Action/Field';
import { Fragment } from 'react';

// import { useForm } from 'react-hook-form';
const OrderMeasuementFields = ({ fields, prefix, defaultValues, ...rest1 }) => {
  return (
    <div className={csses.orderMeasuementFields}>
      {fields?.map((field) => {
        let { name, _id, ...rest } = field;
        const { register } = rest1;
        // console.log(defaultValues[_id]);
        const prevName = `measurements.${_id}.size`;
        let predefined;
        if (defaultValues) {
          predefined = { [prevName]: defaultValues?.[_id] };
        }
        return (
          <Fragment key={_id}>
            <input
              type="hidden"
              readOnly
              {...register(
                'measurements' + (prefix || '') + '.' + _id + '.label'
              )}
              value={rest.label}
            />
            <Field
              {...{
                predefined,
                name: 'measurements' + (prefix || '') + '.' + _id + '.size',
                ...rest1,
                ...rest,
              }}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

export default OrderMeasuementFields;