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

///////////////////////////////////////////////////////////////////////////////////////
// import { TextField } from '@mui/material';
// import csses from './order.module.css';
// import Field from '../../ui/Action/Field';

// // import { useForm } from 'react-hook-form';
// const OrderMeasuementUp = ({ fields, ...rest1 }) => {
//   return (
//     <div className={csses.orderMeasuementFields}>
//       {fields?.map((field) => {
//         if (Array.isArray(field)) {
//           return (
//             <div key={field[0].name}>
//               {field.map((item) => {
//                 let { name, defaultError, validation, ...rest } = item;
//                 return (
//                   <TextField
//                     key={name}
//                     {...register(name, { ...validation })}
//                     name={name}
//                     onFocus={onFocus}
//                     color="secondary"
//                     variant="filled"
//                     label={name}
//                     fullWidth
//                     error={
//                       gqlErrs?.[name] ? true : errors?.[name] ? true : false
//                     }
//                     helperText={
//                       gqlErrs?.[name]
//                         ? gqlErrs?.[name]
//                         : errors?.[name]
//                         ? errors?.[name]?.message || defaultError
//                         : ''
//                     }
//                     {...rest}
//                     sx={{ marginBottom: '5px' }}
//                   />
//                 );
//               })}
//             </div>
//           );
//         } else {
//           let { ...rest } = field;
//           return (
//             <Field
//               key={rest.name}
//               {...{
//                 ...rest1,
//                 ...rest,
//               }}
//             />
//           );
//         }
//       })}
//     </div>
//   );
// };

// export default OrderMeasuementUp;
///////////////////////////////////////////////////////////////////////////////////////
// import { TextField } from '@mui/material';
// import csses from './order.module.css';
// import { orderUpMeasurementFields } from '../../arrayForms/orderFields';
// // import { useForm } from 'react-hook-form';
// const OrderMeasuementUp = ({ register, errors, gqlErrs, onFocus }) => {
//   // const {
//   //   register,
//   //   handleSubmit,
//   //   reset,
//   //   formState: { errors },
//   // } = useForm();
//   return (
//     <div className={csses.orderMeasuementFields}>
//       {orderUpMeasurementFields?.map((field) => {
//         if (Array.isArray(field)) {
//           return (
//             <div key={field[0].name}>
//               {field.map((item) => {
//                 let { name, defaultError, validation, ...rest } = item;
//                 return (
//                   <TextField
//                     key={name}
//                     {...register(name, { ...validation })}
//                     name={name}
//                     onFocus={onFocus}
//                     color="secondary"
//                     variant="filled"
//                     label={name}
//                     fullWidth
//                     error={
//                       gqlErrs?.[name] ? true : errors?.[name] ? true : false
//                     }
//                     helperText={
//                       gqlErrs?.[name]
//                         ? gqlErrs?.[name]
//                         : errors?.[name]
//                         ? errors?.[name]?.message || defaultError
//                         : ''
//                     }
//                     {...rest}
//                     sx={{ marginBottom: '5px' }}
//                   />
//                 );
//               })}
//             </div>
//           );
//         } else {
//           let { name, defaultError, validation, ...rest } = field;
//           return (
//             <TextField
//               key={name}
//               {...register(name, { ...validation })}
//               name={name}
//               onFocus={onFocus}
//               color="secondary"
//               variant="filled"
//               label={name}
//               fullWidth
//               error={gqlErrs?.[name] ? true : errors?.[name] ? true : false}
//               helperText={
//                 gqlErrs?.[name]
//                   ? gqlErrs?.[name]
//                   : errors?.[name]
//                   ? errors?.[name]?.message || defaultError
//                   : ''
//               }
//               {...rest}
//               sx={{ marginBottom: '5px' }}
//             />
//           );
//         }
//       })}
//     </div>
//   );
// };

// export default OrderMeasuementUp;