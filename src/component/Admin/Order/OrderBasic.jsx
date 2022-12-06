import { Checkbox, Typography } from '@mui/material';
import csses from './order.module.css';
import { orderBasicFields } from '../../arrayForms/orderFields';
// import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
// import moment from 'moment';
// import { DATE } from '../../../utils';
import Field from '../../ui/Action/Field';
const OrderBasic = ({ watch, ...params }) => {
  const [urgent, setUngent] = useState(false);

  useEffect(() => {
    // document
    //   .querySelector("[name='order_date']")
    //   ?.setAttribute('max', moment().format(DATE));
    // if (urgent) {
    //   document
    //     .querySelector("[name='delivery_date']")
    //     ?.setAttribute('min', moment().format(DATE));
    // } else {
    //   document
    //     .querySelector("[name='delivery_date']")
    //     ?.setAttribute('min', moment().add(10, 'd').format(DATE));
    // }
  });
  return (
    <>
      <Typography component="div" className={csses.gridFullLast}>
        <Checkbox
          onChange={() => {
            setUngent((p) => !p);
          }}
        />
        Urgent
      </Typography>
      {orderBasicFields?.map?.((field) => (
        <Field key={field.name} {...{ ...field, ...params }} />
      ))}
    </>
  );
};

export default OrderBasic;
