// import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { LinearProgress, Box, TextField, Button } from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
import { measuementFields } from './../../arrayForms/measurementFields';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useMutMeasurement from './useMutMeasurement';
import removeGqlErrors from '../../utils/removeGqlErrors';
import lodash from 'lodash';
import useGetQurey from '../../hooks/gql/useGetQurey';
import Field from '../../ui/Action/Field';
import compareTwoObj from '../../utils/compareTwoObj';

const valuesInit = { name: '', sl_id: '', icon: '' };
const EditMeasuremen = () => {
  const { id: ID } = useParams();
  const [gqlErrs, setGqlErrs] = useState({});
  const { loading: processing, data: measurement } = useGetQurey(
    'SINGLE_MEASUREMENT',
    {
      key: '_id',
      value: ID,
    },
    'getMeasurement'
  );
  const {
    processing: loading,
    updateMeasurement,
    bug,
  } = useMutMeasurement(null, setGqlErrs);
  // console.log(measurement, 'measurement');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const onSubmit = (data) => {
    setGqlErrs({});
    if (Object.keys(gqlErrs).length > 0) return;
    const isChange = compareTwoObj(measurement, data);
    if (isChange.noChange) return setGqlErrs(isChange.bugs);
    console.log(data);
    updateMeasurement({
      variables: {
        id: ID,
        update: data,
      },
    });
  };
  // if (measurement) {
  //   console.log(measurement);
  // }
  return (
    <AdminLayout>
      {(loading || processing) && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {!loading && !processing && measurement && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            {measuementFields?.map((field) => {
              return (
                <Field
                  key={field?.name}
                  // {...register('fjkdjf')}
                  {...{
                    ...field,
                    register,
                    errors,
                    gqlErrs,
                    setGqlErrs,
                    predefined: measurement,
                    removeGqlErrors,
                  }}
                />
              );
            })}
            <Button
              disabled={
                loading ||
                Object.keys(errors).length > 0 ||
                Object.keys(gqlErrs).length > 0
              }
              variant="contained"
              fullWidth
              endIcon={<Save />}
              type="submit"
            >
              Update
            </Button>
          </form>
        </div>
      )}
    </AdminLayout>
  );
};

export default EditMeasuremen;

// <TextField
// key={name}
// {...register(name, { ...validation })}
// defaultValue={measurement?.[name] || ''}
// name={name}
// onFocus={({ target: { name } }) =>
//   removeGqlErrors(name, gqlErrs, setGqlErrs)
// }
// color="secondary"
// variant="filled"
// label={name}
// fullWidth
// error={gqlErrs?.[name] ? true : errors?.[name] ? true : false}
// helperText={
//   gqlErrs?.[name]
//     ? gqlErrs?.[name]
//     : errors?.[name]
//     ? errors?.[name]?.message || defaultError
//     : ''
// }
// {...rest}
// />
