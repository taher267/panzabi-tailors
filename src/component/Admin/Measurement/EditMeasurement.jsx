// import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { LinearProgress, Box, TextField, Button } from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
import { measuementFields } from './../../arrayForms/measurementForm';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useMutMeasurement from './useMutMeasurement';
import removeGqlErrors from '../../utils/removeGqlErrors';
import lodash from 'lodash';
import useGetQurey from '../../hooks/gql/useGetQurey';

const valuesInit = { name: '', sl_id: '', icon: '' };
const EditMeasuremen = () => {
  const { id: ID } = useParams();
  const [gqlErrs, setGqlErrs] = useState({});
  const { loading: processing, data: measurement } = useGetQurey(
    'SINGLE_MEASUREMENT',
    {
      key: 'id',
      value: ID,
    },
    'getMeasurement'
  );
  // const { processing, measurement, bug: error } = useSingleMeasuement(ID);
  const {
    processing: loading,
    updateMeasurement,
    bug,
  } = useMutMeasurement(null, setGqlErrs);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => {
    setGqlErrs({});
    if (Object.keys(gqlErrs).length > 0) return;
    let newObj = {};
    for (const i of Object.keys(data)) {
      newObj[i] = measurement[i];
    }
    if (lodash.isEqual(newObj, data)) {
      for (const i of Object.keys(data)) {
        setGqlErrs((p) => ({ ...p, [i]: `Nothing to be changed` }));
      }
      return;
    }
    // console.log({ id: ID, ...data });
    updateMeasurement({
      variables: {
        id: ID,
        update: data,
      },
    });
    // updateMeasurement({ variables: { id: ID, ...data } });
  };
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
            {measuementFields?.map(
              ({ name, defaultError, validation, ...rest }) => (
                <TextField
                  key={name}
                  {...register(name, { ...validation })}
                  defaultValue={measurement?.[name] || ''}
                  name={name}
                  onFocus={({ target: { name } }) =>
                    removeGqlErrors(name, gqlErrs, setGqlErrs)
                  }
                  color="secondary"
                  variant="filled"
                  label={name}
                  fullWidth
                  error={gqlErrs?.[name] ? true : errors?.[name] ? true : false}
                  helperText={
                    gqlErrs?.[name]
                      ? gqlErrs?.[name]
                      : errors?.[name]
                      ? errors?.[name]?.message || defaultError
                      : ''
                  }
                  {...rest}
                />
              )
            )}
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
              Update Measurement
            </Button>
          </form>
        </div>
      )}
    </AdminLayout>
  );
};

export default EditMeasuremen;
